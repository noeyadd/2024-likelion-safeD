from django.urls import path
from .views import *

app_name='memory'
urlpatterns = [
    path('', mstart, name='mstart'),
]