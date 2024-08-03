from django.shortcuts import render

def mstart(request):
    return render(request, 'memory.html')