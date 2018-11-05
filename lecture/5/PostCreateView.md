{% raw %}

# PostCreateView

```python
# board/forms.py
from django import forms
from .models import Post

class PostForm(forms.ModelForm):
    class Meta:
        model = Post
        fields = [ 'title', 'author', 'content', 'password' ]
        widgets = {
            'password': forms.PasswordInput,
        }
```

1. [ModelForm](https://docs.djangoproject.com/en/2.1/topics/forms/modelforms/#modelform)
  - [Form](../4/#form)의 확장으로, 특정 Model과 밀접하게 대응되는 form을 만들 때 사용
    * Model Field에 대응되는 Form Field를 자동으로 만들어 줌.
  - inner **Meta** class를 만들어 Model 관련 정보를 집어 넣음.
    * 굳이 **Meta** 를 만든 이유는, 평범한 Form Field와 구분하기 위함.
    * `model`: Model class
    * `fields`: 사용자에게 입력받을 속성 이름이 담긴 리스트.
  - `password`의 경우 Form Field에서 추가적으로 필요한 정보가 있음
    * `widget`: 데이터가 HTML tag로 해석될 때 어떤 element로 해석되는지를 지정해 줌.
      - `password`의 경우 `<input type="password" ...>` 옵션이 필요함
      - [widget=forms.PasswordInput](https://docs.djangoproject.com/en/2.1/ref/forms/widgets/#passwordinput)
    * **Meta** 바깥에 `password = forms.CharField(label='Password', max_length=20, widget=forms.PasswordInput)` 이라 정의할 수도 있음
      - 다만 label, max_length이 redundant하다는 문제
      - cf. [Overriding the default fields](https://docs.djangoproject.com/en/2.1/topics/forms/modelforms/#overriding-the-default-fields)

```python
# board/views.py
from django.views.generic.edit import CreateView
from django.urls import reverse
from .models import Post
from .forms import PostForm

class PostCreateView(CreateView):
    model = Post
    form_class = PostForm

    def get_success_url(self):
        return reverse('post_detail', args=[self.object.pk])
```

1. [CreateView](https://docs.djangoproject.com/en/2.1/ref/class-based-views/generic-editing/#createview)
  - default `template_name`: `"<app_label>/<model_name>_form.html"`
  - [ModelFormMixin](https://docs.djangoproject.com/en/2.1/ref/class-based-views/mixins-editing/#django.views.generic.edit.ModelFormMixin)
    * `model`, `fields`를 입력받아 ModelForm을 생성해줌
    * 이 예제에서는 `PostForm`을 이미 정의했기 때문에 `fields` 대신 `form_class` 속성 사용
    * 입력이 성공적으로 진행되었을 경우 (`form_valid()`), `success_url`로 redirect
      - `PostCreateView.success_url = "{pk}/"` 로 해도 되지만, URL 유지보수를 위해 `reverse()` 사용
        * cf. [reverse()](https://docs.djangoproject.com/en/2.1/ref/urlresolvers/#django.urls.reverse)
      - `reverse()`는 URLconf가 불러와진 상태에서만 사용할 수 있어 `PostCreateView.success_url`에 대입 불가
        * 대신 `get_success_url()`을 overriding

```html
<!DOCTYPE html>
<!-- board/templates/board/post_form.html -->
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title>Write or Edit Post - Seminar5</title>
  </head>
  <body>
    <form method="post">
      {% csrf_token %}
      {{ form.as_p }}
      <input type="submit" value="Write">
    </form>
  </body>
</html>
```

# [Go back to Lecture 5](./)

{% endraw %}
