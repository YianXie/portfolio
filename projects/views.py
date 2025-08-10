from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.template import loader
from django.conf import settings
from django.views.decorators.csrf import csrf_exempt
import requests
import json

REPOS_TOKEN = settings.REPOS_TOKEN
HEADERS = {"Authorization": f"token {REPOS_TOKEN}"}


# Create your views here.
def projects(request):
    template = loader.get_template("projects.html")

    # The name in the link can be changed
    return HttpResponse(
        template.render({"repos": get_github_repos("YianXie")}, request)
    )


def get_github_repos(username):
    url = f"https://api.github.com/users/{username}/repos"

    response = requests.get(url, headers=HEADERS)

    if response.status_code == 200:
        print("valid")
        return response.json()
    else:
        print(f"invalid status code of {response.status_code}")
        return {"error": f"Failed to fetch repositories ({response.status_code})"}


@csrf_exempt
def get_github_repo_langs(request):
    if request.method != "POST":
        return JsonResponse(
            {"error": f"Only POST method allowed {request.method}"}, status=405
        )

    try:
        data = json.loads(request.body)
        url = data.get("url")

        response = requests.get(url, headers=HEADERS)

        if response.status_code == 200:
            return JsonResponse(response.json(), safe=False)
        else:
            return JsonResponse({"error": "Failed to fetch repositories"}, status=400)

    except json.JSONDecodeError:
        return JsonResponse({"error": "Invalid JSON data"}, status=400)
