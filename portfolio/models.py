from django.db import models
from django.core.validators import URLValidator

# Create your models here.

class Profile(models.Model):
    """Main profile information"""
    name = models.CharField(max_length=100, default="Nischit Shrestha")
    tagline = models.CharField(max_length=200, default="Experiencing the Full Stack Developer Life")
    description = models.TextField(default="Turning ideas into interactive and scalable web solutions.")
    profile_image = models.ImageField(upload_to='profile/', blank=True, null=True)
    email = models.EmailField()
    phone = models.CharField(max_length=20, blank=True)
    location = models.CharField(max_length=100, blank=True)
    
    # Social Links
    github_url = models.URLField(blank=True)
    linkedin_url = models.URLField(blank=True)
    twitter_url = models.URLField(blank=True)
    
    # Resume
    resume_file = models.FileField(upload_to='resume/', blank=True, null=True)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        verbose_name = "Profile"
        verbose_name_plural = "Profile"
    
    def __str__(self):
        return self.name


class ProfileImage(models.Model):
    """Additional profile images for slider"""
    profile = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name='images')
    image = models.ImageField(upload_to='profile/slider/')
    order = models.IntegerField(default=0, help_text="Order in slider (after the main profile image)")
    
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['order', 'created_at']
        verbose_name = "Profile Image"
        verbose_name_plural = "Profile Images"
        
    def __str__(self):
        return f"Image for {self.profile.name} ({self.pk})"


class Education(models.Model):
    """Education history"""
    institution = models.CharField(max_length=200)
    degree = models.CharField(max_length=200)
    field_of_study = models.CharField(max_length=200, blank=True)
    start_date = models.DateField(blank=True, null=True)
    end_date = models.DateField(blank=True, null=True, help_text="Leave blank if currently studying")
    is_current = models.BooleanField(default=False)
    description = models.TextField(blank=True, help_text="Grade, honors, or activities")
    order = models.IntegerField(default=0, help_text="Display order")
    
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['order', '-start_date']
        verbose_name = "Education"
        verbose_name_plural = "Education"
    
    def __str__(self):
        return f"{self.degree} at {self.institution}"



class Experience(models.Model):
    """Work experience entries"""
    title = models.CharField(max_length=200, help_text="Job title, e.g., 'Python Django Intern'")
    company = models.CharField(max_length=200, blank=True)
    description = models.TextField(help_text="Brief description of your role and achievements")
    start_date = models.DateField(blank=True, null=True)
    end_date = models.DateField(blank=True, null=True, help_text="Leave blank if currently working")
    is_current = models.BooleanField(default=False, help_text="Check if this is your current position")
    order = models.IntegerField(default=0, help_text="Display order (lower numbers appear first)")
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['order', '-start_date']
        verbose_name = "Experience"
        verbose_name_plural = "Experiences"
    
    def __str__(self):
        return f"{self.title} at {self.company}" if self.company else self.title


class Skill(models.Model):
    """Skills organized by category"""
    CATEGORY_CHOICES = [
        ('frontend', 'Frontend'),
        ('backend', 'Backend'),
        ('database', 'Database'),
        ('tools', 'Tools & Technologies'),
        ('other', 'Other'),
    ]
    
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES)
    name = models.CharField(max_length=100, help_text="Skill name, e.g., 'React'")
    description = models.TextField(blank=True, help_text="Optional: Technologies in this category")
    proficiency = models.IntegerField(default=50, help_text="Proficiency level (0-100)")
    icon = models.CharField(max_length=50, blank=True, help_text="e.g. 'devicon-python-plain' from devicon.dev")
    order = models.IntegerField(default=0, help_text="Display order within category")
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['category', 'order']
        verbose_name = "Skill"
        verbose_name_plural = "Skills"
    
    def __str__(self):
        return f"{self.get_category_display()}: {self.name}"


class Project(models.Model):
    """Portfolio projects"""
    STATUS_CHOICES = [
        ('completed', 'Completed'),
        ('in_progress', 'In Progress'),
        ('planned', 'Planned'),
    ]
    
    title = models.CharField(max_length=200)
    description = models.TextField()
    image = models.ImageField(upload_to='projects/', blank=True, null=True)
    project_url = models.URLField(blank=True, help_text="Live project URL")
    github_url = models.URLField(blank=True, help_text="GitHub repository URL")
    
    technologies = models.CharField(max_length=300, help_text="Comma-separated list of technologies used")
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='completed')
    
    featured = models.BooleanField(default=False, help_text="Show in featured projects section")
    order = models.IntegerField(default=0, help_text="Display order (lower numbers appear first)")
    
    start_date = models.DateField(blank=True, null=True)
    end_date = models.DateField(blank=True, null=True)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['order', '-created_at']
        verbose_name = "Project"
        verbose_name_plural = "Projects"
    
    def __str__(self):
        return self.title


class Testimonial(models.Model):
    """Client/colleague testimonials"""
    name = models.CharField(max_length=100)
    position = models.CharField(max_length=100, help_text="e.g., 'CEO at Company'")
    company = models.CharField(max_length=100, blank=True)
    testimonial = models.TextField()
    avatar = models.ImageField(upload_to='testimonials/', blank=True, null=True)
    rating = models.IntegerField(default=5, help_text="Rating out of 5")
    
    is_active = models.BooleanField(default=True)
    order = models.IntegerField(default=0)
    
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['order', '-created_at']
        verbose_name = "Testimonial"
        verbose_name_plural = "Testimonials"
    
    def __str__(self):
        return f"{self.name} - {self.company}"


class ContactMessage(models.Model):
    """Messages from contact form"""
    name = models.CharField(max_length=100)
    email = models.EmailField()
    subject = models.CharField(max_length=200, blank=True)
    message = models.TextField()
    
    is_read = models.BooleanField(default=False)
    is_replied = models.BooleanField(default=False)
    
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['-created_at']
        verbose_name = "Contact Message"
        verbose_name_plural = "Contact Messages"
    
    def __str__(self):
        return f"Message from {self.name} - {self.created_at.strftime('%Y-%m-%d')}"


class SiteSettings(models.Model):
    """Global site settings"""
    site_title = models.CharField(max_length=100, default="N:PORTFOLIO")
    site_description = models.TextField(default="Full Stack Developer Portfolio")
    favicon = models.ImageField(upload_to='site/', blank=True, null=True)
    
    # SEO
    meta_keywords = models.CharField(max_length=300, blank=True)
    google_analytics_id = models.CharField(max_length=50, blank=True)
    
    # Contact
    contact_email = models.EmailField(default="nischitshrestha@example.com")
    
    # Social Media
    show_social_links = models.BooleanField(default=True)
    
    # Features
    enable_blog = models.BooleanField(default=False)
    enable_testimonials = models.BooleanField(default=True)
    
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        verbose_name = "Site Settings"
        verbose_name_plural = "Site Settings"
    
    def __str__(self):
        return "Site Settings"
    
    def save(self, *args, **kwargs):
        # Ensure only one instance exists
        self.pk = 1
        super().save(*args, **kwargs)
    
    @classmethod
    def load(cls):
        obj, created = cls.objects.get_or_create(pk=1)
        return obj
