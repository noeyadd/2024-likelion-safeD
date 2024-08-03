from django.urls import path
from .views import *

app_name='problem'
urlpatterns = [
    path('', pstart, name='pstart'),
]