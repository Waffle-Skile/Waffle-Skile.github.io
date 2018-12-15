from django.db import models
from django.contrib import admin

# Create your models here.
class Post(models.Model):
    title = models.CharField(max_length=140)
    author = models.CharField(max_length=40)
    content = models.TextField()

    created_at = models.DateTimeField(auto_now_add=True)
    modified_at = models.DateTimeField(auto_now=True)
    
    hit = models.IntegerField(default=0)
    password = models.CharField(max_length=10)

admin.site.register(Post)