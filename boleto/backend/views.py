from django.shortcuts import render
from .serializers import *
from .models import *
from rest_framework.views import APIView
import json
from rest_framework.response import Response
from rest_framework import status
from django.db.models import Q
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated, IsAdminUser 
from django.core.paginator import Paginator
from rest_framework import generics

# Create your views here.

class SignUpView(APIView):
    def post(self, request):
        user_data = json.loads(request.body)
        existing_user = User.objects.filter(email=user_data['email'])
        if not existing_user:
            serializer = UserSerializer(data=user_data)
            if serializer.is_valid():
                serializer.save()
                return Response({"message": "Account Created"}, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return Response({"message": "User already exists"}, status=status.HTTP_400_BAD_REQUEST)
        
        
class SignInView(APIView):
    
    def post(self, request):
        user_data = request.data
        serializer = LoginSerializer(data=user_data)
        if serializer.is_valid():
            user = serializer.validated_data
            token = RefreshToken.for_user(user)
            user_serializer = UserSerializer(user)
            serialized_user = user_serializer.data
            return Response(
                {
                    "message": "Login Successful", 
                    "access_token": str(token.access_token),
                    "refresh_token": str(token),
                    "user" : serialized_user
                },
                status=status.HTTP_200_OK,
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class ProfileView(APIView):
    def get(self, request):
        user = request.user
        serializer = UserSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)

class MovieByidView(APIView):
    def get(self, request, id):
        if id:
            try:
                movie = Movie.objects.get(id=id)
                serializer = MovieSerializer(movie).data
                return Response(serializer, status=status.HTTP_200_OK)
            except Movie.DoesNotExist:
                return Response({"message": "Movie not found"}, status=status.HTTP_404_NOT_FOUND)
        
class MovieView(APIView):
    def get_permissions(self):
        if self.request.method in ['POST', 'PUT', 'DELETE']:
            return [IsAuthenticated(), IsAdminUser()]
        return []
    
    def get(self, request):
        
        query = request.GET.get("query", None)
        rating = request.GET.get("rating", None)
        genre = request.GET.get("genre", None)
        language = request.GET.get("language", None)
        page_no = request.GET.get("page", 1)
        allMovies = Movie.objects.all().order_by('id')
        if query:
            allMovies = allMovies.filter(
                Q(title__icontains=query) | Q(description__icontains=query))
        if rating:
            allMovies = allMovies.filter(rating__iexact=rating)
        if genre:
            allMovies = allMovies.filter(genre__icontains=genre)
        if language:
            allMovies = allMovies.filter(language__icontains=language)
        paginate = Paginator(allMovies, 6)
        page = paginate.get_page(page_no)
        page_data = page.object_list
        
        serializer = MovieSerializer(page_data, many=True).data
        return Response(
            {
                "count": allMovies.count(),
                "total_page": paginate.num_pages,
                "next": page.has_next(),
                "previous": page.has_previous(),
                "data": serializer
             },
            status=status.HTTP_200_OK
            )
        
    def post(self, request):
        movie_data = request.data
        serializer = MovieSerializer(data=movie_data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def put(self, request, id=None):
        try:
            movie = Movie.objects.get(id=id)
        except Movie.DoesNotExist:
            return Response({"message": "Movie not found"}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = MovieSerializer(movie, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, id=None):
        try:
            movie = Movie.objects.get(id=id)
        except Movie.DoesNotExist:
            return Response({"message": "Movie not found"}, status=status.HTTP_404_NOT_FOUND)
        
        movie.delete()
        return Response({"message": "Movie deleted successfully"}, status=status.HTTP_200_OK)
        
class TheatreView(APIView):
    def get_permissions(self):
        if self.request.method in ['POST', 'PUT', 'DELETE']:
            return [IsAuthenticated(), IsAdminUser()]
        return []
    
    def post(self, request):
        theatre_data = request.data
        serializer = TheatreSerializer(data=theatre_data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def put(self, request, id=None):
        try:
            theatre = Theatre.objects.get(id=id)
        except Theatre.DoesNotExist:
            return Response({"message": "Theatre not found"}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = TheatreSerializer(theatre, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, id=None):
        try:
            theatre = Theatre.objects.get(id=id)
        except Theatre.DoesNotExist:
            return Response({"message": "Theatre not found"}, status=status.HTTP_404_NOT_FOUND)
        
        theatre.delete()
        return Response({"message": "Theatre deleted successfully"}, status=status.HTTP_200_OK)

class SeatView(APIView):
    def get_permissions(self):
        if self.request.method in ['POST', 'DELETE']:
            return [IsAuthenticated(), IsAdminUser()]
        return []
    
    def get(self, request, id):
        try:
            seat = Seat.objects.get(id=id)
        except Seat.DoesNotExist:
            return Response({"message": "Seat not found"}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = SeatSerializer(seat).data
        return Response(serializer, status=status.HTTP_200_OK)
    
    def post(self, request):
        seat_data = request.data
        serializer = SeatSerializer(data=seat_data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def put(self, request):
        seat_ids = request.data.get("seats", [])
        try:
            seat = Seat.objects.filter(id__in=seat_ids)
        except Seat.DoesNotExist:
            return Response({"message": "Seat not found"}, status=status.HTTP_404_NOT_FOUND)
        
        isReserved = request.data.get("is_reserved")
        if isReserved:
            seat.update(is_reserved=isReserved)
            serializer = SeatSerializer(seat, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response({"error": "Missing 'isReserved' field in request data"}, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, id=None):
        try:
            seat = Seat.objects.get(id=id)
        except Seat.DoesNotExist:
            return Response({"message": "Seat not found"}, status=status.HTTP_404_NOT_FOUND)
        
        seat.delete()
        return Response({"message": "Seat deleted successfully"}, status=status.HTTP_200_OK)
    
class TheatresByMovieView(APIView):
    def get(self, request, movie_id):
        try:
            movie = Movie.objects.get(id=movie_id)
        except Movie.DoesNotExist:
            return Response({"message": "Movie not found"}, status=status.HTTP_404_NOT_FOUND)
        
        theatres = Theatre.objects.filter(movie=movie)
        serializer = TheatreSerializer(theatres, many=True).data
        return Response(serializer, status=status.HTTP_200_OK)
    
class SeatsByTheatreView(APIView):
    def get(self, request, movie_id, theatre_id):
        try:
            theatre = Theatre.objects.get(id=theatre_id)
        except Theatre.DoesNotExist:
            return Response({"message": "Theatre not found"}, status=status.HTTP_404_NOT_FOUND)
        
        seats = Seat.objects.filter(Q(theatre_id=theatre_id) & Q(movie_id=movie_id))
        serializer = SeatSerializer(seats, many=True).data
        return Response(serializer, status=status.HTTP_200_OK)
    
# class BookingView(APIView):
#     def post(self, request):
#         booking_data = request.data
#         booking_data['user'] = request.user.id
#         serializer = BookingSerializer(data=booking_data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class BookingView(APIView):
    def post(self, request):
        booking_data = request.data
        booking_data['user'] = request.user.id
        
        movie_id = booking_data.get('movie')
        theatre_id = booking_data.get('theatre')
        seat_ids = booking_data.get('seat')
        try:
            movie = Movie.objects.get(id=movie_id)
            theatre = Theatre.objects.get(id=theatre_id)
            seats = Seat.objects.filter(id__in=seat_ids)
        except (Movie.DoesNotExist,Theatre.DoesNotExist,Seat.DoesNotExist) as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)                
        
        booking_data['movie'] = movie
        booking_data['theatre'] = theatre
        
        serializer = BookingSerializer(data=booking_data)
        
        if serializer.is_valid():
            booking = serializer.save()
            booking.seat.set(seats)
            booking.movie = movie
            booking.theatre = theatre
            booking.save()
            serializer = BookingSerializer(booking)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def get(self, request, id):
        try:
            booking = Booking.objects.get(id=id)
        except Booking.DoesNotExist:
            return Response({"message": "Booking not found"}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = BookingSerializer(booking).data
        return Response(serializer, status=status.HTTP_200_OK)
    
    def put(self, request, id):
        try:
            booking = Booking.objects.get(id=id)
        except Booking.DoesNotExist:
            return Response({"message": "Booking not found"}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = BookingSerializer(booking, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, id):
        try:
            booking = Booking.objects.get(id=id)
        except Booking.DoesNotExist:
            return Response({"message": "Booking not found"}, status=status.HTTP_404_NOT_FOUND)
        
        booking.delete()
        return Response({"message": "Booking deleted successfully"}, status=status.HTTP_200_OK)
    
class BookingByUserView(APIView):
    def get(self, request):
        bookings = Booking.objects.filter(user=request.user)
        serializer = BookingSerializer(bookings, many=True).data
        return Response(serializer, status=status.HTTP_200_OK)
    