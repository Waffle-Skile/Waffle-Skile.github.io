{% raw %}

# PostUpdateView

```python
# board/forms.py
from django import forms
from django.core.exceptions import ValidationError
from .models import Post

class PostForm(forms.ModelForm):
    class Meta:
        model = Post
        fields = [ 'title', 'author', 'content', 'password' ]
        widgets = {
            'password': forms.PasswordInput,
        }

    def clean_password(self):
        password = self.cleaned_data['password']
        if self.instance.pk:  # on Update
            if password != self.instance.password:
                raise ValidationError("Wrong password.", code='wrong_password')

        return password
```

1. 수정할 때 작성된 게시물의 비밀번호와 Form에 입력된 비밀번호를 검증하는 함수 작성.
1. Form Field의 유효성을 검사하는 방법에는 여러가지가 있다.
  - cf. [Form and field validation](https://docs.djangoproject.com/en/2.1/ref/forms/validation/#form-and-field-validation)
  - 그 중에서, Form을 구성하는 모든 field에 대해 `clean_<fieldname>()` 함수가 호출됨을 이용.
    * Form에 입력된 값을 cleaned 형태로 반환해주는 함수
    * 유효하지 않은 값에 대해서는 `django.core.exceptions.ValidationError`를 raise
    * `clean_<fieldname>()`에는 parameter가 없어서, `self.cleaned_data`를 사용해서 입력된 폼의 값을 알아내야 함.
1. ModelForm의 경우 `self.instance`를 통해 현재 Form이 다루고 있는 Model에 접근할 수 있음
  - cf. [django.forms.models Source Code](https://github.com/django/django/blob/b9cf764be62e77b4777b3a75ec256f6209a57671/django/forms/models.py)
  - `form_valid()` 호출 전까지는 `self.instance.save()` 되지 않기 때문에,
  PostCreateView와 연결된 `self.instance`의 `pk`는 *None*,
  PostUpdateView와 연결된 `self.instance`의 `password`는 Update되지 않음/
    * PostCreateView와 PostUpdateView를 구분할 수 있음
    * PostUpdateView에서 호출되었을 때, password validation 시행

```python
# board/views.py
from django.views.generic.edit import CreateView, UpdateView
from django.urls import reverse
from .models import Post
from .forms import PostForm

class PostUpdateView(UpdateView):
    model = Post
    form_class = PostForm

    def get_success_url(self):
        return reverse('post_detail', args=[self.object.pk])
```

1. **UpdateView** 를 상속했다는 점만 제외하면,
[PostCreateView](./PostCreateView.md)와 동일한 동작을 함.
  - form_class도 재사용, Form Template도 재사용.

# [Go back to Lecture 5](./)

{% endraw %}
