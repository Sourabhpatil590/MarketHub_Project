from django.db import models
from django.contrib.auth.models import AbstractUser, AbstractBaseUser, PermissionsMixin
from django.utils import timezone

# Create your models here.


class User(AbstractUser):
    email = models.CharField(unique=True, max_length=100)
    password = models.CharField(max_length=100)
    user_type = models.CharField(max_length=10)
    username = None
    name = None

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = [ 'password']


