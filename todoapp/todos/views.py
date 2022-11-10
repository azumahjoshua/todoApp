from django.shortcuts import render
from rest_framework import viewsets
from .serializers import TodoSerializers
from .models import Todo

# Create your views here.
class TodoViewSet(viewsets.ModelViewSet):
    serializers_class = TodoSerializers
    querryset = Todo.objects.all()