from django.shortcuts import render

def pstart(request):
    return render(request, 'problem.html')