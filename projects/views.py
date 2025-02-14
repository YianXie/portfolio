from django.shortcuts import render
from django.http import HttpResponse
from django.template import loader

# Create your views here.
def projects(request):
    template = loader.get_template('projects.html')
    return HttpResponse(template.render())