from django.urls import path
from .views import *

app_name='reaction'
urlpatterns = [
    path('', rstart, name='rstart'),
    path('game/', game, name='game')
]