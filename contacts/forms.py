from django import forms


class ContactForm(forms.Form):
    name = forms.CharField(
        label="Your Name",
        max_length=100,
        widget=forms.TextInput(attrs={"placeholder": "Your name"}),
    )
    email = forms.EmailField(
        label="Your Email",
        max_length=100,
        widget=forms.TextInput(attrs={"placeholder": "Your email"}),
    )
    message = forms.CharField(
        label="Your Message",
        widget=forms.Textarea(attrs={"placeholder": "What's on your mind?"}),
    )
