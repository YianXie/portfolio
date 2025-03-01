from django.urls import path
from . import views

urlpatterns = [
    path('', views.switch_theme, name='switch_theme'),
]
