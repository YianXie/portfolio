from django.shortcuts import render
from django.http import HttpResponse
from django.template import loader
import requests
import os

GITHUB_TOKEN = os.getenv("GITHUB_TOKEN")

# Create your views here.
def projects(request):
    template = loader.get_template('projects.html')
    return HttpResponse(template.render({"repos": github_repos("YianXie")}, request))

def github_repos(username):
    url = f"https://api.github.com/users/{username}/repos"
    headers = {"Authorization": f"token {GITHUB_TOKEN}"}
    
    response = requests.get(url, headers=headers)
    
    if response.status_code == 200:
        return response.json()
    else:
        return f"Error: {response.status_code}, {response.json().get('message', '')}"