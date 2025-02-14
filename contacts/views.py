from django.shortcuts import render
from django.http import HttpResponse
from django.template import loader

# Create your views here.
def contacts(request):
    template = loader.get_template('contacts.html')
    return HttpResponse(template.render())