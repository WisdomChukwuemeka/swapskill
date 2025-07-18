from django.shortcuts import render
from .serializers import CategorySerializer, SkillSerializer, BookingSerializer, SkillsNestedSerializer
from rest_framework import generics, status, permissions
from rest_framework.response import Response
from rest_framework.permissions import IsAdminUser, IsAuthenticated, AllowAny
from rest_framework_simplejwt.tokens import RefreshToken
from accounts.models import User
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.views import APIView
from .models import Category, Booking, Skill
from rest_framework.exceptions import PermissionDenied

# Create your views here.

class CategoryView(generics.ListCreateAPIView):
    serializer_class = CategorySerializer
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        categories = serializer.save(user=request.user)
        return Response({
            'categories': CategorySerializer(categories).data,
            'message': "Category selected",
        }, status=status.HTTP_201_CREATED)
        
class SkillView(generics.ListCreateAPIView):
    serializer_class = SkillSerializer
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]  # ✅ For files

    def post(self, request, *args, **kwargs):
        if Skill.objects.filter(user=request.user).exists():
            return Response(
                {"detail": "You have already registered a skill."},
                status=status.HTTP_400_BAD_REQUEST
            )
        serializer = self.get_serializer(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        skill = serializer.save()
        return Response({
            "skill": SkillSerializer(skill).data,
            "message": "Uploaded successfully"
        }, status=status.HTTP_201_CREATED)

        
class BookView(generics.ListCreateAPIView):
    serializer_class = BookingSerializer
    permission_classes = [AllowAny]
    parser_classes = [MultiPartParser, FormParser]
    
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        book = serializer.save(user=request.user)
        return Response({
            "book": BookingSerializer(book).data,
            "message": "Upload successfully",
        }, status=status.HTTP_201_CREATED)
            
class SkillNestedView(generics.RetrieveDestroyAPIView):
    serializer_class = SkillsNestedSerializer
    permission_classes = [permissions.AllowAny]
    
    def get_queryset(self):
        user = self.request.user
        if user.is_authenticated and user.role == 'create':
             # ✅ If logged in → only their own skills
            return Skill.objects.filter(user=user)
        else:
            # if not logged in => show all skills
            return Skill.objects.all()