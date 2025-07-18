from django.db import models
from django.conf import settings
from django.core.validators import MaxValueValidator, MinValueValidator
import uuid
# Create your models here.



class Category(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    CATEGORY_CHOICES = [
        ('business', 'Business'),
        ('legal', 'Legal'),
        ('agriculture', 'Agriculture'),
        ('technology', 'Technology'),
        ('design', 'Design'),
        ('marketing', 'Marketing'),
        ('real_estate', 'Real Estate'),
        ('engineering', 'Engineering'),
        ('education', 'Education'),
        ('health', 'Health'),
        ('travel_hospitality', 'Travel Hospitality'),
    ]
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    category_name = models.CharField(max_length=20, choices=CATEGORY_CHOICES, default="business", unique=True, blank=False, null=False)
    
class Skill(models.Model):
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    profile_image = models.ImageField(upload_to="images/skill_image", blank=False, null=False)
    full_name = models.CharField(max_length=40)
    bio = models.CharField(max_length=1000, blank=False, null=False)
    certificate = models.ImageField(upload_to="images/certificate", blank=True, null=True)
    experience = models.CharField(max_length=40)
    skills = models.JSONField(default=list)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"{self.category.category_name} - {self.skills}"
    
    
    class Meta:
        ordering = ['created_at']
        


    
class Booking(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('confirmed', 'Confirmed'),
        ('cancelled', 'Cancelled'),
        ('completed', 'Completed'),
    ]
    skill = models.ForeignKey(Skill, on_delete=models.CASCADE)
    note = models.TextField(max_length=500)
    booking_user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    booking_date = models.DateField()
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='pending')
    
    
