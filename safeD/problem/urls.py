from django.urls import path
from .views import *

app_name='problem'
urlpatterns = [
    path('', start, name='start'),
    path('pp/', pstart, name='pstart'),
    path('quiz/', quiz_view, name='quiz_view'),
    path('submit/', submit_answer, name='submit_answer'),
    path('result/', result_view, name='result_view'),
    path('note/', note_view, name='note_view'),
    path('note/<str:direction>/', note_navigation, name='note_navigation'),
]