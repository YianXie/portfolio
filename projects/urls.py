from django.urls import path
from .views import *

urlpatterns = [
    path("", projects, name="projects"),
    path("api/github-repo-langs/", get_github_repo_langs, name="get_github_repo_langs"),
]
