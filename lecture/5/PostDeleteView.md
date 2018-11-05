{% raw %}

# PostDeleteView

```python
# models.py
from django.contrib import messages
from django.http import HttpResponseRedirect
from django.views.generic.edit import CreateView, UpdateView, DeleteView
from django.urls import reverse
from .models import Post


class PostDeleteView(DeleteView):
    model = Post

    def get_success_url(self):
        return reverse('post_list')

    def post(self, request, *args, **kwargs):
        object = self.get_object()
        if object.password != request.POST.get('password', ''):
            messages.error(request, 'Wrong Password. Deletion Failed.')
            return HttpResponseRedirect(
                    reverse('post_detail', args=[object.pk]))

        messages.info(request, f'Successfully Deleted - {object.title}')
        return super().post(self, request, *args, **kwargs)
```

1. `template_name` 기본값: `<app_label>/<model_name>_confirm_delete.html`
1. [DeletionMixin](https://docs.djangoproject.com/en/2.1/ref/class-based-views/mixins-editing/#deletionmixin)
  - `delete(request, *args, **kwargs)` 함수가 호출될 때 모델에서 데이터가 삭제됨
  - 또한 이 Mixin은 `post(request, *args, **kwargs)`를 overriding
  - cf. [django.views.generic.edit.DeleteView Source Code](https://github.com/django/django/blob/b9cf764be62e77b4777b3a75ec256f6209a57671/django/views/generic/edit.py)
1. 우선 DeletionMixin의 `post()`를 overriding하고,
만약 Password Verification이 성공적으로 진행되었을 경우 `super().post()` 실행
  - Password Verification에는 [SingleObjectMixin](https://docs.djangoproject.com/en/2.1/ref/class-based-views/mixins-single-object/#django.views.generic.detail.SingleObjectMixin)의 `get_object()` 사용
  - django.forms.Form을 따로 사용하지 않았기 때문에 `request.POST`로 직접 접근
1. 사용자의 이해를 돕기 위해 [Message Framework](https://docs.djangoproject.com/en/2.1/ref/contrib/messages/#module-django.contrib.messages) (django.contrib.messages) 사용
  - `settings.py`의 `INSTALLED_APPS`에 `django.contrib.messages` 추가 (이미 되어있음)
  - cf. [Adding a message](https://docs.djangoproject.com/en/2.1/ref/contrib/messages/#module-django.contrib.messages)
  - cf. [Displaying messages](https://docs.djangoproject.com/en/2.1/ref/contrib/messages/#module-django.contrib.messages)
    * 예시는 [post_detail.html](./PostDetailView.md) Template 참조

```html
<!DOCTYPE html>
<!-- board/templates/board/post_confirm_delete.html -->
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title>Delete {{ object.title }}</title>
  </head>
  <body>
    <form method="post">
      {% csrf_token %}
      <p>Delete <b>{{ object.title|escape }}</b>?</p>
      <input type="password" name="password" value="" required>
      <input type="submit" name="confirm" value="Confirm">
    </form>
  </body>
</html>
```

1. `<input>`의 `required` 필드는 제출할 때 해당 값이 비어있지 않는지 검증한다.
2. DeleteView가 SingleObjectMixin을 상속했기 때문에, `{{ object }}`를 사용할 수 있다.

# [Go back to Lecture 5](./)

{% endraw %}
