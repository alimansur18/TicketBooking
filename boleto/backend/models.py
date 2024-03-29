from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager

# Create your models here.

class UserManager(BaseUserManager):
    def create_user(self, username, password, **extra_fields):
        if not username:
            raise ValueError("Username is required")
        user = self.model(username=username, **extra_fields)
        user.set_password(password)
        user.save()
        return user
    
    def create_superuser(self, username, password, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        return self.create_user(username, password, **extra_fields)
    
class User(AbstractBaseUser):
    name = models.CharField(max_length=100)
    username = models.CharField(max_length=100, unique=True)
    email = models.EmailField(max_length=200, unique=True)
    password = models.CharField(max_length=200)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    USERNAME_FIELD = "username"
    objects = UserManager()
    
    def __str__(self):
        return self.username
    
    def has_perm(self, perm, obj=None):
        return self.is_superuser
    
    def has_module_perms(self, app_label):
        return self.is_superuser
    
class Movie(models.Model):
    title = models.CharField(max_length=200)
    director = models.CharField(max_length=200)
    genre = models.CharField(max_length=200)
    description = models.TextField()
    image = models.TextField()
    language = models.CharField(max_length=200)
    duration = models.IntegerField()
    release_date = models.IntegerField()
    rating = models.CharField(max_length=5)
    
    def __str__(self):
        return self.title
    
class Theatre(models.Model):
    movie = models.ManyToManyField(Movie)
    name = models.CharField(max_length=200)
    city = models.CharField(max_length=200)
    address = models.CharField(max_length=200)
    
    def __str__(self):
        return self.name
    
class Seat(models.Model):
    theatre = models.ForeignKey(Theatre, on_delete=models.CASCADE)
    movie = models.ForeignKey(Movie, on_delete=models.CASCADE)
    seat_no = models.CharField(max_length=10)
    is_reserved = models.BooleanField(default=False)
    category = models.CharField(max_length=20)
    price = models.FloatField(default=0.0)
    
    def __str__(self):
        return f"{self.theatre.name} - {self.movie.title} - {self.seat_no}"
    
class Booking(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="User")
    movie = models.ForeignKey(Movie, on_delete=models.CASCADE)
    theatre = models.ForeignKey(Theatre, on_delete=models.CASCADE)
    seat = models.ManyToManyField(Seat)
    booking_time = models.DateTimeField(auto_now_add=True)
    total_price = models.FloatField(default=0.0)
    
    def __str__(self):
        return f"{self.user.username} - {self.movie.title}"