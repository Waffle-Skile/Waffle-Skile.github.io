{% raw %}

# PostListView

```python
from django.views.generic.list import ListView
from .models import Post

class PostListView(ListView):
    model = Post
    paginate_by = 10
```

1. [django.views.generic.list.ListView](https://github.com/django/django/blob/b9cf764be62e77b4777b3a75ec256f6209a57671/django/views/generic/list.py)
1. Documentation : [Generic Display Views/ListView](https://docs.djangoproject.com/en/2.1/ref/class-based-views/generic-display/#listview)
1. [MultipleObjectTemplateResponseMixin](https://docs.djangoproject.com/en/2.1/ref/class-based-views/mixins-multiple-object/#django.views.generic.list.MultipleObjectTemplateResponseMixin)
  - `template_name` 기본 값은 `<app_name>/<model_name>_list.html`이다.
1. [MultipleObjectMixin](https://docs.djangoproject.com/en/2.1/ref/class-based-views/mixins-multiple-object/#django.views.generic.list.MultipleObjectMixin)
  1. `pagenate_by` 속성으로써 한 화면에 보여지는 Object의 개수를 조절할 수 있다.
  1. context로 다음 요소들을 넘겨준다.
    - `object_list` (QuerySet)
    - `page_obj` (Page)
    - `paginator` (Paginator)
    - `is_paginated` (boolean)

```html
<!DOCTYPE html>
<!-- board/templates/board/post_list.html -->
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title>Post List - Seminar5</title>
  </head>
  <body>
    {% if messages %}
    <ul class="messages">
      {% for msg in messages %}
      <li>{{ msg }}</li>
      {% endfor %}
    </ul>
    {% endif %}
    <div class="list">
      <ul>
        {% for obj in object_list %}
        <li><a href="{% url 'post_detail' pk=obj.id %}">{{ obj.title }}</a></li>
        {% endfor %}
      </ul>
    </div>
    <div class="paginator">
      {% if page_obj.has_previous %}
      <a href="?page={{ page_obj.previous_page_number }}">Previous</a>
      {% endif %}
      <span class="current">
        Page {{ page_obj.number }} of {{ paginator.num_pages }}.
      </span>
      {% if page_obj.has_next %}
      <a href="?page={{ page_obj.next_page_number }}">Next</a>
      {% endif %}
    </div>
    <div class="footer">
      <a href="{% url 'post_create' %}">Write New Post</a>
    </div>
  </body>
</html>
```

1. [DTL에서는 method를 호출할 때 뒤에 괄호를 붙이지 않는다.](https://docs.djangoproject.com/en/2.1/ref/templates/language/#accessing-method-calls)
1. [URL tag](https://docs.djangoproject.com/en/2.1/ref/templates/builtins/#url)는 `seminar5.urls`를 참조하여 올바른 상대 경로를 구한다.
  - `'post_detail'`은 `board.urls`에 정의한 `path()`의 `name`이다.
  - 뒤의 `pk=obj.id`는 URL에 정의된 매개변수를 지정해준다.
1. `paginator` : [Paginator](https://docs.djangoproject.com/en/2.1/topics/pagination/#paginator-objects)
  - `num_pages()` : 전체 페이지 수
1. `page_obj` : [Page](https://docs.djangoproject.com/en/2.1/topics/pagination/#page-objects)
  - `has_next()` : Returns **True** if there’s a next page.
  - `has_previous()` : Returns **True** if there’s a previous page.
  - `next_page_number()` : 다음 페이지 번호
  - `previous_page_number()` : 이전 페이지 번호
1. `{% if messages %}`는 `PostDeleteView`에서 `django.contrib.messages`를 사용하기 위함
  - [PostDeleteView](./PostDeleteView.md)에서 다시 설명함
  - cf. [Displaying messages](https://docs.djangoproject.com/en/2.1/ref/contrib/messages/#module-django.contrib.messages)

# [Go back to Lecture 5](./)

{% endraw %}
