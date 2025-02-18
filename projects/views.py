from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.template import loader
from django.conf import settings
from django.views.decorators.csrf import csrf_exempt
import requests
import json

GITHUB_TOKEN = settings.GITHUB_TOKEN


# Create your views here.
def projects(request):
    template = loader.get_template("projects.html")

    # The name in the link can be changed
    return HttpResponse(
        template.render({"repos": get_github_repos("YianXie").json()}, request)
    )


def get_github_repos(username):
    url = f"https://api.github.com/users/{username}/repos"
    headers = {"Authorization": f"token {GITHUB_TOKEN}"}

    response = requests.get(url, headers=headers)

    if response.status_code == 200:
        return response
    else:
        return {"error": f"Failed to fetch repositories ({response.status_code})"}


@csrf_exempt
def get_github_repo_langs(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            url = data.get("url")
            headers = {"Authorization": f"token {GITHUB_TOKEN}"}

            response = requests.get(url, headers=headers)

            if response.status_code == 200:
                return JsonResponse(response.json(), safe=False)
            else:
                return JsonResponse(
                    {"error": "Failed to fetch repositories"}, status=400
                )

        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON data"}, status=400)

    else:
        return JsonResponse({"error": f"Only POST method allowed {request.method}"}, status=405)
