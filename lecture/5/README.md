{% raw %}

# Django (3)

## Make A Project
> `>`로 시작하는 명령어는 **명령 프롬프트** 창에 입력해주세요.
> (<kbd>Windows + R</kbd> → `cmd` 입력)

```
> django-admin startproject seminar5
> cd seminar5
> python manage.py startapp board
> python manage.py migrate
```

### Modify `settings.py`

```python
# seminar5/settings.py
# Application definition

INSTALLED_APPS = [
    'board.apps.BoardConfig',  # 추가. 마지막 반점에 유의
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
]
```


## Make `Post` Model

```python
# board/models.py
# Create your models here.
class Post(models.Model):
    title = models.CharField(max_length=140)
    author = models.CharField(max_length=40)
    content = models.TextField()

    created_at = models.DateTimeField(auto_now_add=True)
    modified_at = models.DateTimeField(auto_now=True)

    hit = models.IntegerField(default=0)
    password = models.CharField(max_length=20)
```

```
> python manage.py makemigrations
> python manage.py migrate
```


## Design *URLconfs*

| URL | View | Description |
| :-- | :--- | :---------- |
| `/` | PostListView | 전체 게시물 목록 열람 |
| `<int:id>/` | PostDetailView | 게시물 상세 정보 열람 |
| `write/` | PostCreateView | 게시물 작성 |
| `edit/<int:id>/` | PostUpdateView | 게시물 수정 |
| `delete/<int:id>/` | PostDeleteView | 게시물 삭제 |

```python
# seminar5/urls.py
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('', include('board.urls')),
    path('admin/', admin.site.urls),
]
```

```python
# board/urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('', views.PostListView.as_view(), name='post_list'),
    path('<int:pk>/', views.PostDetailView.as_view(), name='post_detail'),
    path('write/', views.PostCreateView.as_view(), name='post_create'),
    path('edit/<int:pk>/', views.PostUpdateView.as_view(), name='post_update'),
    path('delete/<int:pk>/', views.PostDeleteView.as_view(), name='post_delete'),
]
```

## Views & Templates

### [PostListView](PostListView.md)

### [PostDetailView](PostDetailView.md)

### [PostCreateView](PostCreateView.md)

### [PostUpdateView](PostUpdateView.md)

### [PostDeleteView](PostDeleteView.md)

{% endraw %}
