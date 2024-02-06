from django.contrib.auth import authenticate
from rest_framework import serializers
from .models import *

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    
    class Meta:
        model = User
        fields = ["name", "username", "password", "email"]
        
    def create(self, validated_data):
        user = User.objects.create_user(
            username = validated_data['username'], 
            name = validated_data['name'],
            email = validated_data['email'], 
            password = validated_data['password'])
        return user
        
class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()
    
    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            return user
        raise serializers.ValidationError("Incorrect Credentials")
        
class MovieSerializer(serializers.ModelSerializer):
    class Meta:
        model = Movie
        fields = "__all__"

class TheatreSerializer(serializers.ModelSerializer):
    movie=MovieSerializer(many=True, read_only=True)
    class Meta:
        model = Theatre
        fields = '__all__'
        
class SeatSerializer(serializers.ModelSerializer):
    theatre = TheatreSerializer(read_only=True)
    movie = MovieSerializer(read_only=True)
    class Meta:
        model = Seat
        fields = "__all__"
        
class BookingSerializer(serializers.ModelSerializer):
    movie = MovieSerializer(read_only=True)
    theatre = TheatreSerializer(read_only=True)
    seat = SeatSerializer(many=True,  read_only=True)
    class Meta:
        model = Booking
        fields = "__all__"
