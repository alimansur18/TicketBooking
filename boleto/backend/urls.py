from .views import *
from django.urls import path


urlpatterns = [
    path('user/signup/', SignUpView.as_view(), name='signup-view'),
    path('user/login/', SignInView.as_view(), name='signin-view'),
    path('user/profile/', ProfileView.as_view(), name='profile-detail-view'),
    path('movies/', MovieView.as_view(), name='movie-view'),
    path('movies/<int:id>/', MovieByidView.as_view(), name='movie-detail-view'),
    path('theatres/', TheatreView.as_view(), name='theatre-view'),
    path('theatres/<int:id>/', TheatreView.as_view(), name='theatre-detail-view'),
    path('seats/', SeatView.as_view(), name='all-seat-view'),
    path('seats/<int:id>/', SeatView.as_view(), name='seat-view'),
    path('moviestheatre/<int:movie_id>/', TheatresByMovieView.as_view(), name='movie-theatre-view'),
    path('theatreseat/<int:movie_id>/<int:theatre_id>/', SeatsByTheatreView.as_view(), name='theatre-seat-view'),
    path('booking/', BookingView.as_view(), name='booking-view'),
    path('booking/<int:id>/', BookingView.as_view(), name='booking-detail-view'),
    path('bookings/', BookingByUserView.as_view(), name='booking-by-user'),
]