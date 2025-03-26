# api/views.py
from rest_framework import views, status
from rest_framework.response import Response
from django.contrib.auth.models import User
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authentication import TokenAuthentication
from rest_framework.authtoken.models import Token
from rest_framework.permissions import IsAuthenticated

# internals
from .serializers import (
    CodeExplainSerializer,
    UserSerializer,
    TokenSerializer,
    UserProfileSerializer
)
from .models import CodeExplainer, UserProfile


class CodeExplainView(views.APIView):
    serializer_class = CodeExplainSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        # Filter to only show the user's own explanations
        qs = CodeExplainer.objects.filter(user=request.user)
        serializer = self.serializer_class(qs, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data, context={"request": request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserView(views.APIView):
    serializer_class = UserSerializer

    def get_permissions(self):
        if self.request.method == 'POST':
            return []  # No permission required for registration
        return [IsAuthenticated()]  # Other methods require authentication

    def get(self, request, format=None):
        # For admins, show all users - for regular users, show only themselves
        if request.user.is_staff:
            qs = User.objects.all()
            serializer = self.serializer_class(qs, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            serializer = self.serializer_class(request.user)
            return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserProfileView(views.APIView):
    serializer_class = UserProfileSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        profile, created = UserProfile.objects.get_or_create(user=request.user)
        serializer = self.serializer_class(profile)
        return Response(serializer.data)

    def patch(self, request, format=None):
        profile, created = UserProfile.objects.get_or_create(user=request.user)
        serializer = self.serializer_class(profile, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class TokenView(ObtainAuthToken):
    serializer_class = TokenSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)
        return Response({
            'token': token.key,
            'user_id': user.pk,
            'username': user.username,
            'email': user.email
        })