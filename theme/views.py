from django.shortcuts import redirect

# Create your views here.
def switch_theme(request):
    current_theme = request.session.get('theme', 'dark')
    request.session['theme'] = 'light' if current_theme == 'dark' else 'dark'
    return redirect(request.META.get('HTTP_REFERER', '/'))