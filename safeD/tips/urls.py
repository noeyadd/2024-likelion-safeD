from django.urls import path
from .views import *

app_name='tips'
urlpatterns = [
    path('', tstart, name="tstart"),
    path('tips_detail1/', tips_detail1, name="tips_detail1"),
    path('tips_detail2/', tips_detail2, name="tips_detail2"),
    path('tips_detail3/', tips_detail3, name="tips_detail3"),
    path('tips_detail4/', tips_detail4, name="tips_detail4"),
    path('tips_detail5/', tips_detail5, name="tips_detail5"),
    path('tips_detail6/', tips_detail6, name="tips_detail6"),
    path('tips_detail7/', tips_detail7, name="tips_detail7"),
]