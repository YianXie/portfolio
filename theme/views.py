from django.shortcuts import redirect

# Create your views here.
def switch_theme(request):
    print(f"Session theme: {request.session.get('theme')}")

    current_theme = request.session.get('theme', 'dark')
    request.session['theme'] = 'dark' if current_theme == 'light' else 'light'
    return redirect(request.META.get('HTTP_REFERER', '/'))
