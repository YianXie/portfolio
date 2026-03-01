from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include, path, re_path
from django.views.generic import TemplateView

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/contact/", include("contact.urls")),
    path("api/blogs/", include("blog.urls")),
    path("api/auth/", include("authentication.urls")),
    re_path(r"^.*$", TemplateView.as_view(template_name="index.html"), name="home"),
]

if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
