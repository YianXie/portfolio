from django.contrib import admin
from django.urls import path
from django.urls import include

urlpatterns = [
    path("admin/", admin.site.urls),
    path("", include("home.urls")),
    path("projects/", include("projects.urls")),
    path("contributions/", include("contributions.urls")),
    path("contact/", include("contacts.urls")),
]
