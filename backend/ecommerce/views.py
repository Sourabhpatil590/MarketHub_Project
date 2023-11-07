
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed
from ecommerce.models import User
from ecommerce.serializers import userSerializer, userLoginSerializer, userGetSerializer, userResetPasswordSerializer, userForgotPasswordSendEmailSerializer, userForgotPasswordResetSerializer
import datetime, jwt
from ecommerce.renderer import ResponseRenderer
from django.db.models.base import ObjectDoesNotExist
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.authentication import BasicAuthentication, SessionAuthentication
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.tokens import default_token_generator
from django.urls import reverse
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes, force_str
# from django.views.decorators import ensure_csrf_cookie, csrf_protect
from django.utils.decorators import method_decorator
from rest_framework_simplejwt.tokens import RefreshToken

# Generate Token manually
def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)
    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }

# Create your views here.
class registerAPI(APIView):
    permission_classes = [AllowAny]
    renderer_classes = [ResponseRenderer]
    def post(self, request):
        
        serializer = userSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            # user = serializer.create(serializer.validated_data)
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class loginAPI(APIView):
    renderer_classes = [ResponseRenderer]
    def post(self, request):
        serializer = userLoginSerializer(data = request.data)
        if serializer.is_valid(raise_exception=True):
            email = serializer.data['email']
            password = serializer.data['password']
            user = authenticate(email = email, password = password)
            if user:
                token = get_tokens_for_user(user)
                login(request, user=user, )
                return Response({"message":"logged in successfully", "token": token})
            return Response({"message": "incorrect credentials"})
        return Response(serializer.errors, status=status.HTTP_404_NOT_FOUND )

class logoutAPI(APIView):
    authentication_classes = [BasicAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        if request.user is not None:
            logout(request)
            return Response({"message": "user is logged out"})
    
class userGetAPI(APIView):
    renderer_classes = [ResponseRenderer]
    permission_classes = [IsAuthenticated]

    def get(self,request, format=None):
        serializer = userGetSerializer(request.user)
        return Response({'message': 'User is authenticated', 'key': serializer.data}, status=status.HTTP_202_ACCEPTED)
    
class userResetPasswordAPI(APIView):
    renderer_classes = [ResponseRenderer]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = userResetPasswordSerializer(data=request.data, context={'user': request.user})
        if serializer.is_valid(raise_exception=True):
            return Response({"message": "password reset successful"}, status=status.HTTP_205_RESET_CONTENT)
        return Response(serializer.errors, status=status.HTTP_403_FORBIDDEN)
        
class userForgotPasswordSendEmailAPI(APIView):
    def post(self, request):
        serializer = userForgotPasswordSendEmailSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        return Response({"message": "reset link is sent on registered email ID"}, status=status.HTTP_205_RESET_CONTENT)
    
class userForgotPasswordResetAPI(APIView):
    renderer_classes = [ResponseRenderer]
    def post(self, request, uid, token):
        data = {
            "uid": uid,
            "token": token
        }
        serializer = userForgotPasswordResetSerializer(data=request.data, context=data)
        serializer.is_valid(raise_exception=True)
        return  Response({"Message": "Password reset successful"})