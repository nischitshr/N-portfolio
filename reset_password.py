import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'nischit_portfolio.settings')
django.setup()

from django.contrib.auth.models import User

try:
    user = User.objects.get(username='admin')
    user.set_password('adminpassword')
    user.save()
    print("Successfully reset password for user 'admin' to 'adminpassword'")
except User.DoesNotExist:
    print("User 'admin' does not exist")
except Exception as e:
    print(f"Error: {e}")
