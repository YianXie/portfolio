def theme_mode(request):
    return {"theme": request.session.get("theme", "dark")}