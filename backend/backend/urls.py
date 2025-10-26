from django.contrib import admin
from django.urls import path, re_path
from django.urls import include
from django.views.generic import TemplateView
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/contact/", include("contact.urls")),
    # Serve React app for all other routes
    re_path(r"^.*$", TemplateView.as_view(template_name="index.html"), name="home"),
]

if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
