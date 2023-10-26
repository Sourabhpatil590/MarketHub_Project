from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed
from .models import User
from .serializers import userSerializer
import datetime, jwt


# Create your views here.



class registerAPI(APIView):
    def post(self, request):

        serializer = userSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class loginAPI(APIView):
    def post(self, request):
        email = request.data['email']
        password = request.data['password']
        user = User.objects.get(email = email)

        if not user:
            raise AuthenticationFailed('email not valid')
        
        if not user.check_password(password):
            raise AuthenticationFailed('password incorrect')
        
        payload = {
            'id': user.id,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=30),
            'iat': datetime.datetime.utcnow()
        }

        token = jwt.encode(payload, 'secret', algorithm='HS256')

        response = Response(status=status.HTTP_202_ACCEPTED)

        response.set_cookie(key='jwt', value=token, httponly=True)
        response.data = {
            'jwt': token
        }

        return response

class logoutAPI(APIView):
    def post(self, request):
        response = Response(status=status.HTTP_202_ACCEPTED)
        response.delete_cookie('jwt')
        response.data = {
            'message': 'logged out'
        }
        return response
    
class userGetAPI(APIView):
    def get(self,request):
        token = request.COOKIES.get('jwt')

        if not token:
            raise AuthenticationFailed('UnAuthorized')
        
        try:
            payload = jwt.decode(token, 'secret', algorithms=['HS256'])
        except jwt.ExpiredSignatureError as e:
            raise AuthenticationFailed('UnAuthenticated')
        
        user = User.objects.filter(id = payload['id'])
        serializer = userSerializer(user, many=True)
        return Response({'message': 'User is allowed to access', 'key': serializer.data}, status=status.HTTP_202_ACCEPTED)
        