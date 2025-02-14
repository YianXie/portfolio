from django.shortcuts import render
from django.http import HttpResponse
from django.template import loader

# Create your views here.
def contributions(request):
    template = loader.get_template('contributions.html')
    return HttpResponse(template.render())