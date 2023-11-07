from rest_framework import serializers
from ecommerce.models import User
from django.contrib.auth import authenticate
from django.utils.encoding import smart_str, force_bytes, DjangoUnicodeDecodeError
from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from ecommerce.utils import Util


class userSerializer(serializers.ModelSerializer):
    confirm_password = serializers.CharField(style={'input_type':"password" }, write_only=True)

    class Meta:
        model = User
        fields = ['name', 'email', 'password', 'confirm_password']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)

    def validate(self, attrs):
        name = attrs.get('name')
        password = attrs.get('password')
        confirm_password = attrs.get('confirm_password')
        email = attrs.get('email')

        # Name validation
        if not name:
            raise serializers.ValidationError("name field required")

        # Password validation
        if password != confirm_password:
            raise serializers.ValidationError("password and confirm password should match")
        
        # email validation
        if User.objects.filter(email=email).exists():
            raise serializers.ValidationError("user with this Email already exists")

        return attrs

class userLoginSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(max_length=150)
    class Meta:
        model = User
        fields = ["email", "password"]

class userGetSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [ "id", "name", "email", 'user_type']

class userResetPasswordSerializer(serializers.Serializer):
    old_password = serializers.CharField(max_length=150)
    new_password = serializers.CharField(max_length=150)

    def validate(self, attrs):
        user = self.context.get('user')
        auth_user = authenticate(email=user.email, password= attrs.get('old_password'))
        old_pass = attrs.get('old_password')
        new_pass = attrs.get('new_password')
        if old_pass == new_pass:
            raise serializers.ValidationError('new password and old password should not match')
        if auth_user:
            user.set_password(attrs.get('new_password'))
            user.save()
        else:
            raise serializers.ValidationError("incorrect credentials")
        
        return attrs
    
class userForgotPasswordSendEmailSerializer(serializers.Serializer):
    email = serializers.EmailField()

    class Meta:
        fields = ['email']

    def validate(self, attrs):
        user = User.objects.filter(email=attrs.get('email'))
        print(user)
        if user:
            # Send Email
            user = user.get(email=attrs.get('email'))
            uid =  urlsafe_base64_encode(force_bytes(user.id))
            token = PasswordResetTokenGenerator().make_token(user)
            resetLink = 'http://localhost:3000/api/forgot-password/reset/' + uid + '/' + token
            print("reset link:", resetLink)
            data = {
                "subject": "Forgot password reset link",
                "body": "To reset the password click on following link " + resetLink,
                "to_email": user.email
            }
            Util.send_email(data)
            return attrs

        else:
            raise serializers.ValidationError('Email id is not registered')

class userForgotPasswordResetSerializer(serializers.Serializer):
    password = serializers.CharField(max_length=150)
    confirm_password = serializers.CharField(max_length=150)

    def validate(self, attrs):
        try:
            password = attrs.get('password')
            confirm_password = attrs.get("confirm_password")
            if password != confirm_password:
                raise serializers.ValidationError('password and confirm password should match')
            
            id = smart_str(urlsafe_base64_decode(self.context.get('uid')))
            user = User.objects.get(id=id)
            token = self.context.get('token')
            if not PasswordResetTokenGenerator().check_token(user, token):
                raise serializers.ValidationError('Token is not Valid or Expired')
            user = User.objects.get(id = id)
            user.set_password(password)
            user.save()
            return attrs
        except DjangoUnicodeDecodeError:
            raise serializers.ValidationError('Invalid uid or token, please check if token is expired')
