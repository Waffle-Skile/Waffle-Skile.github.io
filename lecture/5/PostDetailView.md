{% raw %}

# PostDetailView

```python
# board/views.py에 추가
from django.views.generic import DetailView
from .models import Post

class PostDetailView(DetailView):
    model = Post

    def get(self, request, *args, **kwargs):
        self.object = self.get_object()
        self.object.hit += 1
        self.object.save()
        context = self.get_context_data(object=self.object)
        return self.render_to_response(context)
```

1. [BaseDetailView](https://github.com/django/django/blob/b9cf764be62e77b4777b3a75ec256f6209a57671/django/views/generic/detail.py)
  - Post object에 접근할 때마다 `hit`을 1 높여주기 위해 `get()`을 override했다.
  - `SingleObjectMixin`에 정의된 `get_object()`는 주어진 query에 대응되는 Model object를 반환한다.
  - `SingleObjectMixin`에 정의된 `get_context_data()`는 `object`를 dictionary로 변환한다.
  - `TemplateResponseMixin`에 정의된 `render_to_response()`는 `context`를 이용해 Model object와 Template를 매칭한다.
1. [SingleObjectTemplateResponseMixin](https://docs.djangoproject.com/en/2.1/ref/class-based-views/mixins-simple/#templateresponsemixin)
  - `template_name` 기본값 : `<app_label>/<model_name>_detail.html`

```html
<!DOCTYPE html>
<!-- board/templates/board/post_detail.html -->
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title>{{ object.title }} - Seminar5</title>
  </head>
  <body>
    <div class="header">
      <h1>{{ object.title }}</h1>
      <p>
        Created at <em>{{ object.created_at }}</em><br>
        Modified at <em>{{ object.modified_at }}</em>
      </p>
      <p><b>Hit:</b> {{ object.hit }}</p>
      {% if object.get_previous_by_created_at %}
      <p>
        <a href="{% url 'post_detail' object.get_previous_by_created_at.pk %}">
          Previous - <b>{{ object.get_previous_by_created_at.title }}</b>
        </a>
      </p>
      {% endif %}
      {% if object.get_next_by_created_at %}
      <p>
        <a href="{% url 'post_detail' object.get_next_by_created_at.pk %}">
          Next - <b>{{ object.get_next_by_created_at.title }}</b>
        </a>
      </p>
      {% endif %}
    </div>
    {% if messages %}
    <ul class="messages">
      {% for msg in messages %}
      <li>{{ msg }}</li>
      {% endfor %}
    </ul>
    {% endif %}
    <div class="content">
      {{ object.content|escape|linebreaks }}
    </div>
    <div class="footer">
      <a href="{% url 'post_update' object.pk %}">Edit</a>
      <a href="{% url 'post_list' %}">Back</a>
    </div>
  </body>
</html>
```

1. `{{ object.content|escape|linebreaks }}`의 `|escape`와 `|linebreaks`는 [DTL의 Filter 문법](https://docs.djangoproject.com/en/2.1/ref/templates/language/#filters)이다.
  - [escape](https://docs.djangoproject.com/en/2.1/ref/templates/builtins/#escape) :
  HTML 문서에 사용되는 특수기호를 escape한다. (`<`에서 `&lt;`로 바꾸는 등)
  - [linebreaks](https://docs.djangoproject.com/en/2.1/ref/templates/builtins/#linebreaks) :
  일반 텍스트의 강제 개행을 `<br>`이나 `<p>` 태그로 바꿔준다.
1. `{% if messages %}`는 `PostDeleteView`에서 `django.contrib.messages`를 사용하기 위함
  - [PostDeleteView](./PostDeleteView.md)에서 다시 설명함
  - cf. [Displaying messages](https://docs.djangoproject.com/en/2.1/ref/contrib/messages/#module-django.contrib.messages)
1. `get_previous_by_FOO`: Not Null인 DateField/DateTimeField에 대해서 제공되는 기능
  - `FOO`에는 모델의 필드 이름인 `created_at`을 집어넣었음.
  - Post Object를 반환하므로, pk나 title 등 속성에 자유롭게 접근 가능
  - cf. [Model.get_previous_by_FOO()](https://docs.djangoproject.com/en/2.1/ref/models/instances/#django.db.models.Model.get_next_by_FOO)

# [Go back to Lecture 5](./)

{% endraw %}
