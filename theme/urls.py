from django.urls import path
from .views import *

urlpatterns = [
    path("", switch_theme, name="switch_theme")
]
