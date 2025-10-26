from django.shortcuts import render
from django.http import HttpResponse
from django.core.mail import send_mail
from django.conf import settings
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .forms import ContactForm


def contacts(request):
    success_message = None
    form = ContactForm()

    if request.method == "POST":
        form = ContactForm(request.POST)
        if form.is_valid():
            # Process form data (e.g., send an email)
            name = form.cleaned_data.get("name", "Anonymous")
            email = form.cleaned_data["email"]
            message = form.cleaned_data["message"]

            subject = f"Message from {name} ({email})"
            body = f"Sender name: {name}\nSender email: {email}\nSender messages: {message}"

            send_mail(
                subject,
                body,
                settings.DEFAULT_FROM_EMAIL,
                [settings.DEFAULT_FROM_EMAIL],
                fail_silently=False,
            )

            success_message = f"Thank you, {name}. Your message has been sent!"
            form = ContactForm()  # Clear the form after submission

    return render(
        request, "contacts.html", {"form": form, "success_message": success_message}
    )


@api_view(['POST'])
def contact_api(request):
    """API endpoint for contact form submission"""
    name = request.data.get('name', '')
    email = request.data.get('email', '')
    message = request.data.get('message', '')

    if not all([name, email, message]):
        return Response(
            {'error': 'All fields are required'},
            status=status.HTTP_400_BAD_REQUEST
        )

    try:
        subject = f"Message from {name} ({email})"
        body = f"Sender name: {name}\nSender email: {email}\nSender messages: {message}"

        send_mail(
            subject,
            body,
            settings.EMAIL_HOST_USER,
            [settings.EMAIL_HOST_USER],
            fail_silently=False,
        )

        return Response(
            {'message': f'Thank you, {name}. Your message has been sent!'},
            status=status.HTTP_200_OK
        )
    except Exception as e:
        return Response(
            {'error': 'Failed to send email. Please try again later.'},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

