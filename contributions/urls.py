from django.urls import path
from . import views

urlpatterns = [
    path('', views.contributions, name='contributions'),
]
