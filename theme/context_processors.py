def theme_mode(request):
    print("Context Processor!")
    return {'theme': request.session.get('theme', 'dark')}