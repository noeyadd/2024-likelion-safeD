from django.shortcuts import render

def tstart(request):
    return render(request, 'tips.html')