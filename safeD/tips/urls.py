from django.urls import path
from .views import *

app_name='tips'
urlpatterns = [
    path('', tstart, name='tstart'),
]