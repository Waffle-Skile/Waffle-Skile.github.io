from django.urls import path
from .views import *

urlpatterns = [
    path('', PostListView.as_view(), name="post_list"),
    path('detail/<int:pk>/', PostDetailView.as_view(), name="post_detail"),
    path('write/', PostCreateView.as_view(), name="post_create"),
    path('edit/<int:pk>/', PostUpdateView.as_view(), name="post_update"),
    path('delete/<int:pk>/', PostDeleteView.as_view(), name="post_delete"),
]