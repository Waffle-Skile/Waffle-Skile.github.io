# Django (2)

## Prerequisite

* [Getting Started with Django - djangoproject.com](https://docs.djangoproject.com/en/2.1/intro/tutorial01/)
  - [한국어 버전](https://docs.djangoproject.com/ko/2.1/intro/tutorial01/)

## Review

[저번 주에 참석하셨다면 넘어가도 좋습니다.](#main)

### Django 설치

```
> python -m pip install django
> python -m django --version
```

Windows 명령 프롬프트에서, `'python'은(는) 내부 또는 외부 명령, ... 이 아닙니다.`
라고 뜨는 경우, **시스템 환경 변수** 를 확인하세요.

### MVT(Model-View-Template) Pattern

![MVT Pattern](https://www.tutorialspoint.com/django/images/django_mvc_mvt_pattern.jpg)

### 프로젝트 생성 흐름

```
> django-admin startproject <project_name>
> cd <project_name>
```

#### Django Project가 잘 설치되었는지 확인

```
> python manage.py runserver
> ^C
```

<kbd>Ctrl + C</kbd>로 서버를 종료할 수 있습니다.

#### Application 생성하기

```
> python manage.py startapp <app_name>
```

##### `models.py` 모델 설계

| Key | Column | Type | Default | Nullable | Comment |
| --- | ------ | ---- | ------- | -------- | ------- |
| PK | pk | INTEGER | AUTOINCREMENT | No | |
| | title | CHAR(140) | | No | |
| | author | CHAR(40) | | No | |
| | content | VARCHAR | | No | |
| | password | CHAR(20) | | No | |
| | created_at | DATETIME | `auto_now_add` | No | |
| | modified_at | DATETIME | `auto_now` | No | |

```python
# app_name/models.py
from django.db import models

class Post(models.Model):
    title = models.CharField(max_length=140)
    author = models.CharField(max_length=40)
    content = models.TextField()

    created_at = models.DateTimeField(auto_now_add=True)
    modified_at = models.DateTimeField(auto_now=True)

```

Django Documentation에서 [Model Field Reference](https://docs.djangoproject.com/en/2.1/ref/models/fields/)를 확인함으로써,
DB column 자료형이 어떤 Field랑 맞춰지는지 확인할 수 있습니다.

##### `makemigrations`와 `migrate`

```
> python manage.py makemigrations
No changes detected
```

```python
# project_name/settings.py
# Application definition

INSTALLED_APPS = [
    'app_name.apps.AppNameConfig',  # add THIS LINE
    # ... omitted ...
]
```

* `makemigrations` : Model의 변경 사항을 **추적** (~ `commit`)

```
> python manage.py makemigrations
Migrations for 'app_name':
  app_name\migrations\0001_initial.py
    - Create model Post
```

* `migrate` : 추적(`makemigrations`)된 변경 사항을 실제 DB에 **반영** (~ `checkout`)

## Main

### admin 계정 등록

방금 만든 Post Model을, Django의 `django.contrib.admin` Application과 연결해봅시다.

```python
# app_name/models.py
from django.db import models
from django.contrib import admin  # ADD

class Post(models.Model):
    pass    # omitted

admin.site.register(Post)  # ADD
```

```
> python manage.py createsuperuser
> python manage.py runserver
```

웹 브라우저에 들어가 http://127.0.0.1:8000/admin/ 에 접속합니다.

![Django Admin Page](pics/1.png?raw=true)

### View

Model이 어떤 구조를 갖고 있는지 이해했으니,
이제 Model을 어떻게 웹 브라우저로 표현할 수 있는지
생각해볼 시간입니다.

#### Function-based View

```python
# app_name/views.py
from django.http import HttpResponse

def index(request):
    return HttpResponse("<h1>Hello World!</h1>")
```

##### URLconf (`urls.py`)

```python
# app_name/urls.py
from django.urls import path
from .views import index

urlpatterns = [
    path('', index),
]
```

```python
# project_name/urls.py
from django.contrib import admin
from django.urls import path, include  # ADD 'include'

urlpatterns = [
    path('', include('app_name.urls')),  # ADD this line
    path('admin/', admin.site.urls),
]
```

```
> python manage.py runserver
```

http://127.0.0.1:8000 에 접속하시면 다음 내용을 확인할 수 있습니다.

![h1 Hello World](pics/2.png?raw=true)

### Template

> 본 세미나는 **Django** 만을 잘 쓰는게 목적이 아닙니다.
> 특히 Template 부분의 경우 추후 **React** 라는
> Frontend Framework로 대체할 부분입니다.
> 이 점을 고려하시고, 본 섹션을 이해하는데
> 지나치게 많은 시간을 할애할 필요는 없다는 사실을
> 인지하고 계시면 좋겠습니다.

HTML 소스 코드를 View에서 Hard Coding 하게되면,
HTML 구조가 복잡해질수록 가독성도 떨어지고,
유지보수 측면에서도 좋지 않은 습관입니다.

이에 Django에서는 `django.template` 패키지를 제공합니다.

`project_name/settings.py`의 `TEMPLATES`에서
`APP_DIRS`가 *True* 이면, 각 Application의
`templates/` subdirectory를 템플릿들이 저장되는
기본 경로인 것처럼 취급합니다.

따라서 해당 설정을 확인해주시고 `templates/` 폴더를
만든 다음, HTML 코드를 작성해주세요.

```html
<!-- app_name/templates/index.html -->
<h1>{{ title }}</h1>
{% if content %}
<p>{{ content }}</p>
{% else %}
<p><em>내용이 없습니다.</em></p>
{% endif %}
```

`{{ title }}`이나 `&#123;% if content %&#125;` 등은
[DTL(Django Template Language)](https://docs.djangoproject.com/en/2.1/topics/templates/#the-django-template-language)입니다.

`{{ something }}`는 변수를, `&#123;% something %&#125;`는 logic을 표현하는 방식입니다.

이제 `templates/index.html`을 Context(`title`, `content`)와 연결해서 웹 브라우저상에 표현해 보겠습니다.

```python
# app_name/views.py에 추가
from django.template import loader

def detail(request):
    template = loader.get_template(template_name='index.html')
    context = {
        'title': 'Untitled',
        'content': None
    }
    return HttpResponse(template.render(context, request))
```

```python
# app_name/urls.py
from django.urls import path
from .views import index, detail  # detail 추가

urlpatterns = [
    path('', index),
    path('detail/', detail),  # 추가
]
```

`runserver` 후 http://127.0.0.1:8000/detail/ 에 접속해보세요.

```html
<h1>Untitled</h1>
<p><em>내용이 없습니다.</em></p>
```

Context에 주어지는 정보들은 (주로) Model에서 비롯되고,
Model과 Template을 mapping 시켜주는 역할은 View가 수행합니다.

Django에서는 이러한 MVT model이 보편적이기 때문에,
`django.shortcuts.render()`라는 단축 함수를 제공합니다.

다음 소스 코드는 방금 작성한 `detail`과 똑같습니다.

```python
from django.shortcuts import render

def detail(request):
    return render(request, template_name='index.html', context={
        'title': 'Untitled',
        'content': None
    })
```

### [Class-based View](https://docs.djangoproject.com/en/2.1/ref/class-based-views)

*Function-based View* 를 만들어주는 Class를 의미합니다.
Django에서 전형적으로 많이 쓰이는 형태의 View를
`django.views.generic` 패키지로 제공해주고 있습니다.

Function-based View로 작성한 `detail()`을
Class-based View로는 다음과 같이 작성할 수 있습니다.

```python
from django.views.generic import TemplateView

class DetailView(TemplateView):
    template_name = "index.html"

    def get_context_data(self, **kwargs):
        return { 'title': 'Untitled', 'content': None }
```

```python
# app_name/urls.py
from django.urls import path
from .views import index, DetailView    # 수정

urlpatterns = [
    path('', index),
    path('detail/', DetailView.as_view()),   # 수정
]
```

### [Controlling Model](https://docs.djangoproject.com/en/2.1/topics/db/queries/)

Django에서는 개발자가 직접 DB에 접근하지 않고,
Python 코드를 이용해 Model을 수정할 수 있도록
[Manager](https://docs.djangoproject.com/en/2.1/topics/db/managers/)을 제공해주고 있습니다.

따로 설정하지 않는 이상 `<model name>.objects`로
Manager에 접근할 수 있습니다.

`<model name>.objects.all()`로는 실제 레코드(*DB 테이블의 행*)를 담고 있는 [QuerySet](https://docs.djangoproject.com/en/2.1/ref/models/querysets/)을 얻습니다.

QuerySet에서 다양한 메서드를 호출해서 조건에 맞는 QuerySet이나 Model을 얻을 수 있습니다.

```
> python manage.py shell
>>> from app_name.models import Post
>>> # do something you want
>>> quit()    # to quit from this shell
```

#### Create something

다음 두 소스 코드는 동일한 동작을 합니다.

```python
p = Post(title='1+1?', content='2', author='Skile')
p.save()    # save()하지 않는 경우 DB에 반영되지 않습니다.
```

```python
Post.objects.create(title='1+1?', contents='2', author='Skile')
```

#### Get QuerySet or something

```python
qs = Post.objects.all()    # return QuerySet
len(qs)

for q in qs:
    print(q.title)    # Model.field

p = Post.objects.get(pk=1)    # pk stands for Primary Key

from datetime import datetime
qs = qs.filter(created_at__gt=datetime(2018, 10, 16, 0, 0),
               title__contains='제목')
# created_at__gt: *created_at* is [GRATER THAN] 2018-10-16 00:00
# title__contains: '제목' in *title*
# cf. https://docs.djangoproject.com/en/2.1/ref/models/querysets/#id

qs = qs.order_by('-modified_at')
# '-(minus)': descending order.
# cf. https://docs.djangoproject.com/en/2.1/ref/models/querysets/#order-by

p = qs.first()  # == qs[0].
# Django supports list indexing(and slicing) of QuerySet
```

#### Update something

```python
qs = Post.objects.all()
p = qs.get(pk=2)
p.title = 'New Title'
p.save()
```

```python
Post.objects.filter(pk=2).update(title='New Title')   # returns # of affected rowss
```

#### Delete something

```python
Posts.objects.get(pk=2).delete()    # Model.delete()
```

```python
Posts.objects.all().delete()    # QuerySet.delete()
```

### [GET method](https://docs.djangoproject.com/en/2.1/topics/i18n/translation/#translating-urlpatterns)

정해진 URL(`detail/` 등)만으로는 사용자의 요청을
온전히 반영하기 어려울 수 있습니다. 예를 들어, 다른 게 아니라
딱 3번(`pk==3`) 게시물을 열람하기를 원하는 사용자는 어떻게 서버에
그 요청사항을 전달할 수 있을까요?

그 방법에는 여러가지가 있는데, 그 중 먼저 [GET method](https://www.w3schools.com/tags/ref_httpmethods.asp)를 이용한 요청 방법에 대해 설명하겠습니다.

```
/test/?name1=value1&name2=value2
```

다음과 같이, `?`로 시작해서, `key=value` 쌍을
`&amp;` 구분자로 연결함으로써 일종의 dictionary를 구축하고
그 정보를 서버에 전송합니다.

Django의 경우 `HttpRequest.GET`을 통해서 접근할 수 있습니다.

```python
# app_name/views.py
from django.core.exceptions import ObjectDoesNotExist
from .models import Post

class DetailView(TemplateView):
    template_name = "index.html"

    def get_context_data(self, **kwargs):
        try:
            p = Post.objects.get(pk=self.request.GET.get('id'))
            return { 'title': p.title, 'content': p.content }
        except ObjectDoesNotExist:
            return { 'title': '없는 게시물입니다.', 'content': None }
```

#### URLconf

사용자의 요청 정보를 GET method가 아니고 URL에 직접
명시할 수도 있습니다. 이를테면, 기존의 `/detail/?id=3` 대신
`/detail/3/`으로 표현하는 것입니다.

Django에서는 [URLconf로써](https://docs.djangoproject.com/en/2.1/topics/http/urls/#example) 이를 구현할 수 있습니다.

```python
# urls.py
from django.urls import path
from .views import index, DetailView

urlpatterns = [
    path('', index),
    path('detail/<int:id>/', DetailView.as_view()),
]
```

`&lt;int:`는 대응되는 문자열 패턴이 숫자로만 구성되어 있어야
한다는 제약 조건을 의미하고, `:id&gt;`는 문자열 패턴을
가리킬 이름을 의미합니다.

대응 결과는 keyword arguments로써 전달됩니다.
Function-based View에서는 직접 arguments를 정의하면 되고,
Class-based View에서는 상속된 메서드를 오버라이드해서
`**kwargs` 매개변수를 이용해서 정보를 취득할 수 있습니다.

```python
# in app_name.views.DetailView
def get_context_data(self, **kwargs):
    try:
        p = Post.objects.get(pk=kwargs.get('id', None))
        return { 'title': p.title, 'content': p.content }
    except ObjectDoesNotExist:
        return { 'title': '없는 게시물입니다.', 'content': None }
```

### POST method

URL에 요청사항을 담는 기존의 GET 방식은 다음과 같은 특징이 있습니다.

* 사용자에게 직접 드러나있어 조작하기 간편합니다.
* 길이가 제한되어 있습니다.

따라서 내용이 많거나 민감한 정보(비밀번호 등)는 GET method로
정보를 보내는 것이 적합하지 않습니다.

#### `&lt;form&gt;` (HTML)

`&lt;form&gt;`에 대해서는 [Lecture 2](../2/doc2.html)에서도 다뤄보았습니다.
우선은 Django의 기능 없이 순수 HTML로 Form을 구성해봅시다.

```html
<!-- app_name/templates/create.html -->
<form action="./" method="post">
  <p>
    Title: <input type="text" name="title" value="" maxlength="140">
  </p>
  <p>
    Author: <input type="text" name="author" value="" maxlength="40">
  </p>
  <p>
    Content:
    <textarea name="content"></textarea>
  </p>
  <p><input type="submit" name="submit" value="Write"></p>
</form>

```

```python
# app_name/views.py
class IndexView(TemplateView):
    template_name = "create.html"
```

```python
# app_name/urls.py
from django.urls import path
from .views import IndexView, DetailView

urlpatterns = [
    path('', IndexView.as_view()),
    path('detail/<int:id>/', DetailView.as_view()),
]
```

`runserver` 하면 다음과 같은 결과를 볼 수 있습니다.

![403 Forbidden, CSRF verification failed.](pics/3.png?raw=true)

#### [CSRF(Cross-Site Request Forgery)](https://en.wikipedia.org/wiki/Cross-site_request_forgery)

사용자가 의식하지 못한 상태에서, 특정 사이트에 POST 요청을
보낼 수 있는 공격 기법입니다. 이를 막기 위해,
웹 서버는 사용자마다 서로 다른 token을 부여하고
도착한 POST 요청에 담겨 있는 token 정보와 일치하는지를
확인해서 공격자에 의한 간접적인 POST 요청을 거를 수 있습니다.

Django는 CSRF 보호 기능을 기본값으로 지원하며,
이를 사용하기 위해서는 DTL에서 `{% csrf_token %}`을
Form 태그 안에 넣어주시면 됩니다.

```html
<!-- same file above -->
<form>
{% csrf_token %}
<!-- omitted. -->
</form>
```

#### `request.POST`

`request.POST`도 `request.GET` 같이 dictionary의 형태로
사용자의 요청 정보를 취득할 수 있습니다.

```python
# app_name/views.py
from django.http import HttpResponse
from django.shortcuts import redirect

class IndexView(TemplateView):
    template_name = "create.html"

    def post(self, request, *args, **kwargs):
        title = request.POST.get('title')
        author = request.POST.get('author')
        content = request.POST.get('content')

        if title and author and content:    # simple verification
            p = Post.objects.create(
                title=title,
                author=author,
                content=content
            )
            return redirect(f"/detail/{p.pk}")
        else:
            return HttpResponse("<h1>Please fill in all fields.</h1>\n" +
                    '<a href="./">Return</a>')
```

`django.views.generic.View`로 사용자의 요청이 들어오면
우선 [dispatch()](https://docs.djangoproject.com/en/2.1/topics/http/shortcuts/#redirect) 함수를 호출하여
HTTP method가 무엇인지 파악합니다. 파악된 method에 따라
`get()` 또는 `post()` Python method를 호출합니다.
`TemplateView`의 경우 `get()` method가 이미 정의되어 있어
이전에는 따로 함수를 오버라이드하지 않았지만
`post()` method에서 우리가 원하는 DB에 데이터를 생성하는
작업을 하기 위해서는 위 코드처럼 따로 정의해주어야 합니다.

[redirect()](
https://docs.djangoproject.com/en/2.1/ref/class-based-views/base/#django.views.generic.base.View.dispatch)는
사용자를 다른 주소(본 예시에서는 작성한 글의 detail 페이지)로
이동시켜줍니다.


#### [Form](https://docs.djangoproject.com/en/2.1/topics/forms/)

Django에서 지원하는 `django.forms.Form` 클래스를 이용해서,
방금전에 했던 작업을 똑같이 진행할 수 있습니다.

`app_name/forms.py`를 생성하고 다음과 같은 내용을 넣습니다.

```python
# app_name/forms.py
from django import forms

class PostForm(forms.Form):
    title = forms.CharField(label='Title', max_length=140)
    author = forms.CharField(label='Author', max_length=40)
    content = forms.CharField(label='Content', widget=forms.Textarea)
```

Model 설계할 때와 비슷하지만 models 모듈의 Field가 아니라
[forms 모듈의 Field](https://docs.djangoproject.com/en/2.1/ref/forms/fields/)임에 유의하시길 바랍니다.

`widget` 속성은 해당 Form이 HTML 코드로 변환될 때
어떤 태그를 사용할 것인지를 지정해줍니다.

만든 폼을 표시하기 위해 Template을 수정합니다.

```html
<!-- html -->
<form action="./" method="post">
  {% csrf_token %}
  {{ form.as_p }}
  <p><input type="submit" name="submit" value="Write"></p>
</form>
```

만든 폼을 Template 위에 표시하기 위해 View의 로직을 수정합니다.
기존에 만든 View에 `get_context_data`만 수정해도 되지만,
[FormView](https://docs.djangoproject.com/en/2.1/ref/class-based-views/generic-editing/#formview)를 이용해서
새로운 View를 작성해보겠습니다.

```python
# app_name/views.py
from django.views.generic.edit import FormView
from .forms import PostForm

class IndexView(FormView):
    template_name = "create.html"
    form_class = PostForm

    def form_valid(self, form):
        p = Post.objects.create(**form.cleaned_data)
        return redirect(f"/detail/{p.pk}")
```

Form에 입력된 내용이 유효한 경우,
`FormView.form_valid()` 메서드가 호출됩니다.
매개변수로 넘겨받는 `form`에는 `cleaned_data`라는 속성이 있어,
dictionary의 형태로 사용자의 입력을 관리할 수 있습니다.

### Congratulations!

이로써 Django 및 backend에 대한 웬만한 기본 개념은
다 다뤄보았습니다. 여러분은 충분히 이제 과제 #2를 수행할
능력을 가지셨습니다. 다음 시간에는 Django의 Generic View를
이용하여 보다 짧고 간결한 코드로 게시판 시스템을
구축하는 방법에 대해 다뤄보겠습니다.

## [References](../3/#references)
