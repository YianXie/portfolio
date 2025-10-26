from django.urls import path
from . import views

urlpatterns = [
    path("", views.contacts, name="contacts"),
    path("api/", views.contact_api, name="contact_api"),
]

