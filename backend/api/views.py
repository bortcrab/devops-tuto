from django.shortcuts import render
from rest_framework import viewsets
from .models import UserLog
from .serializers import UserLogSerializer

class UserLogViewSet(viewsets.ModelViewSet):
    queryset = UserLog.objects.all().order_by('-created_at')
    serializer_class = UserLogSerializer