# portfolio/views.py
from django.shortcuts import render
from django.http import JsonResponse
from .models import Profile, Education, Experience, Skill, Project, Testimonial, ContactMessage, SiteSettings

from django.core.mail import send_mail

def home(request):
    # Fetch data from database
    # Since Profile and SiteSettings are singletons (we expect only one), we try to get the first one
    profile = Profile.objects.first()
    settings = SiteSettings.load()
    
    # Get all active/ordered data
    experiences = Experience.objects.all()
    
    # Education
    education = Education.objects.all()

    # Organize skills by category for easier display in template
    # We can do this in the template too, but pre-processing views is often cleaner
    skills = Skill.objects.all().order_by('order', 'category')
    
    # Projects - fetched by order
    projects = Project.objects.filter(status__in=['completed', 'in_progress']).order_by('order')
    
    # Testimonials
    testimonials = Testimonial.objects.filter(is_active=True)

    if request.method == 'POST':
        # Handle contact form submission via AJAX
        try:
            name = request.POST.get('name')
            email = request.POST.get('email')
            message = request.POST.get('message')
            
            ContactMessage.objects.create(
                name=name,
                email=email,
                message=message
            )
            
            # Send Email Notification
            try:
                subject = f"New Contact from Portfolio: {name}"
                email_body = f"Name: {name}\nEmail: {email}\n\nMessage:\n{message}"
                recipient = settings.contact_email
                
                send_mail(
                    subject,
                    email_body,
                    'noreply@portfolio.local', # Sender
                    [recipient],
                    fail_silently=False,
                )
            except Exception as mail_error:
                print(f"Email sending failed: {mail_error}")
                # We continue success because db save worked
            
            return JsonResponse({'status': 'success', 'message': 'Message sent successfully!'})
        except Exception as e:
            return JsonResponse({'status': 'error', 'message': str(e)}, status=400)

    context = {
        'profile': profile,
        'settings': settings,
        'experiences': experiences,
        'education': education,
        'skills': skills,
        'projects': projects,
        'testimonials': testimonials,
    }
    
    return render(request, 'index.html', context)
