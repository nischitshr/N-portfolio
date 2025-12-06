from django.contrib import admin
from django.utils.html import format_html
from .models import (
    Profile, ProfileImage, Education, Experience, Skill, Project, 
    Testimonial, ContactMessage, SiteSettings
)

# Customize admin site header
admin.site.site_header = "N:PORTFOLIO Admin"
admin.site.site_title = "Portfolio Admin"
admin.site.index_title = "Welcome to Your Portfolio Dashboard"


class ProfileImageInline(admin.TabularInline):
    model = ProfileImage
    extra = 1
    max_num = 6
    fields = ['image', 'order']


@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ['name', 'email', 'location', 'updated_at']
    search_fields = ['name', 'email']
    inlines = [ProfileImageInline]
    fieldsets = (
        ('Basic Information', {
            'fields': ('name', 'tagline', 'description', 'profile_image')
        }),
        ('Contact Details', {
            'fields': ('email', 'phone', 'location')
        }),
        ('Social Links', {
            'fields': ('github_url', 'linkedin_url', 'twitter_url'),
            'classes': ('collapse',)
        }),
        ('Resume', {
            'fields': ('resume_file',)
        }),
    )
    
    def has_add_permission(self, request):
        # Only allow one profile instance
        return not Profile.objects.exists()


    def get_queryset(self, request):
        qs = super().get_queryset(request)
        return qs.select_related()


@admin.register(Education)
class EducationAdmin(admin.ModelAdmin):
    list_display = ['degree', 'institution', 'start_date', 'end_date', 'order']
    list_filter = ['is_current', 'start_date']
    search_fields = ['degree', 'institution', 'field_of_study']
    list_editable = ['order']
    
    fieldsets = (
        ('Details', {
            'fields': ('institution', 'degree', 'field_of_study', 'description')
        }),
        ('Timeline', {
            'fields': ('start_date', 'end_date', 'is_current')
        }),
        ('Display', {
            'fields': ('order',)
        }),
    )
@admin.register(Experience)
class ExperienceAdmin(admin.ModelAdmin):
    list_display = ['title', 'company', 'start_date', 'end_date', 'is_current', 'order']
    list_filter = ['is_current', 'start_date']
    search_fields = ['title', 'company', 'description']
    list_editable = ['order']
    ordering = ['order', '-start_date']
    
    fieldsets = (
        ('Position Details', {
            'fields': ('title', 'company', 'description')
        }),
        ('Timeline', {
            'fields': ('start_date', 'end_date', 'is_current')
        }),
        ('Display', {
            'fields': ('order',)
        }),
    )
    
    def get_queryset(self, request):
        qs = super().get_queryset(request)
        return qs.select_related()


@admin.register(Skill)
class SkillAdmin(admin.ModelAdmin):
    list_display = ['name', 'category', 'proficiency_bar', 'order']
    list_filter = ['category']
    search_fields = ['name', 'description']
    list_editable = ['order']
    ordering = ['category', 'order']
    
    fieldsets = (
        ('Skill Information', {
            'fields': ('name', 'category', 'description')
        }),
        ('Details', {
            'fields': ('proficiency', 'icon')
        }),
        ('Display', {
            'fields': ('order',)
        }),
    )
    
    def proficiency_bar(self, obj):
        """Display proficiency as a visual bar"""
        color = '#4CAF50' if obj.proficiency >= 70 else '#FFC107' if obj.proficiency >= 40 else '#F44336'
        return format_html(
            '<div style="width:100px; background:#f0f0f0; border-radius:3px;">'
            '<div style="width:{}px; background:{}; height:20px; border-radius:3px; text-align:center; color:white; font-size:11px; line-height:20px;">'
            '{}%</div></div>',
            obj.proficiency, color, obj.proficiency
        )
    proficiency_bar.short_description = 'Proficiency'


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ['title', 'status', 'featured', 'project_thumbnail', 'order', 'created_at']
    list_filter = ['status', 'featured', 'created_at']
    search_fields = ['title', 'description', 'technologies']
    list_editable = ['order', 'featured']
    ordering = ['order', '-created_at']
    
    fieldsets = (
        ('Project Information', {
            'fields': ('title', 'description', 'image')
        }),
        ('Links', {
            'fields': ('project_url', 'github_url')
        }),
        ('Details', {
            'fields': ('technologies', 'status', 'start_date', 'end_date')
        }),
        ('Display Options', {
            'fields': ('featured', 'order')
        }),
    )
    
    def project_thumbnail(self, obj):
        """Display project image thumbnail"""
        if obj.image:
            return format_html(
                '<img src="{}" style="width:50px; height:50px; object-fit:cover; border-radius:5px;" />',
                obj.image.url
            )
        return format_html('<span style="color:#999;">No image</span>')
    project_thumbnail.short_description = 'Image'


@admin.register(Testimonial)
class TestimonialAdmin(admin.ModelAdmin):
    list_display = ['name', 'position', 'company', 'rating_stars', 'is_active', 'order']
    list_filter = ['is_active', 'rating', 'created_at']
    search_fields = ['name', 'company', 'testimonial']
    list_editable = ['order', 'is_active']
    ordering = ['order', '-created_at']
    
    fieldsets = (
        ('Person Details', {
            'fields': ('name', 'position', 'company', 'avatar')
        }),
        ('Testimonial', {
            'fields': ('testimonial', 'rating')
        }),
        ('Display', {
            'fields': ('is_active', 'order')
        }),
    )
    
    def rating_stars(self, obj):
        """Display rating as stars"""
        stars = '⭐' * obj.rating
        empty = '☆' * (5 - obj.rating)
        return format_html('<span style="font-size:16px;">{}{}</span>', stars, empty)
    rating_stars.short_description = 'Rating'


@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ['name', 'email', 'subject_preview', 'status_badge', 'created_at']
    list_filter = ['is_read', 'is_replied', 'created_at']
    search_fields = ['name', 'email', 'subject', 'message']
    readonly_fields = ['name', 'email', 'subject', 'message', 'created_at']
    ordering = ['-created_at']
    
    fieldsets = (
        ('Message Details', {
            'fields': ('name', 'email', 'subject', 'message', 'created_at')
        }),
        ('Status', {
            'fields': ('is_read', 'is_replied')
        }),
    )
    
    def subject_preview(self, obj):
        """Show subject or first 50 chars of message"""
        if obj.subject:
            return obj.subject[:50]
        return obj.message[:50] + '...' if len(obj.message) > 50 else obj.message
    subject_preview.short_description = 'Subject/Message'
    
    def status_badge(self, obj):
        """Display status with colored badges"""
        if obj.is_replied:
            return format_html(
                '<span style="background:#4CAF50; color:white; padding:3px 8px; border-radius:3px; font-size:11px;">Replied</span>'
            )
        elif obj.is_read:
            return format_html(
                '<span style="background:#2196F3; color:white; padding:3px 8px; border-radius:3px; font-size:11px;">Read</span>'
            )
        else:
            return format_html(
                '<span style="background:#F44336; color:white; padding:3px 8px; border-radius:3px; font-size:11px;">New</span>'
            )
    status_badge.short_description = 'Status'
    
    def has_add_permission(self, request):
        # Don't allow manual creation of contact messages
        return False


@admin.register(SiteSettings)
class SiteSettingsAdmin(admin.ModelAdmin):
    fieldsets = (
        ('Site Information', {
            'fields': ('site_title', 'site_description', 'favicon')
        }),
        ('SEO', {
            'fields': ('meta_keywords', 'google_analytics_id'),
            'classes': ('collapse',)
        }),
        ('Contact', {
            'fields': ('contact_email',)
        }),
        ('Features', {
            'fields': ('show_social_links', 'enable_blog', 'enable_testimonials')
        }),
    )
    
    def has_add_permission(self, request):
        # Only allow one settings instance
        return not SiteSettings.objects.exists()
    
    def has_delete_permission(self, request, obj=None):
        # Don't allow deletion of settings
        return False


# Custom admin actions
@admin.action(description='Mark selected messages as read')
def mark_as_read(modeladmin, request, queryset):
    queryset.update(is_read=True)

@admin.action(description='Mark selected messages as replied')
def mark_as_replied(modeladmin, request, queryset):
    queryset.update(is_replied=True, is_read=True)

ContactMessageAdmin.actions = [mark_as_read, mark_as_replied]
