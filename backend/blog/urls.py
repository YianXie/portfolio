from django.urls import path

from . import views

urlpatterns = [
    path("", views.blog_list, name="blog-list"),
    path("create/", views.blog_create, name="blog-create"),
    path("<slug:slug>/", views.blog_detail, name="blog-detail"),
]
