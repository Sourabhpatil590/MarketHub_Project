from django.contrib import admin
from django.urls import path
from ecommerce.views import registerAPI, loginAPI, logoutAPI, userGetAPI, userResetPasswordAPI, userForgotPasswordSendEmailAPI, userForgotPasswordResetAPI
from rest_framework_simplejwt.views import (TokenObtainPairView, TokenRefreshView,)

urlpatterns = [
    path('register', registerAPI.as_view(), name='register'),
    path('login', loginAPI.as_view(), name='login'),
    path('logout', logoutAPI.as_view(), name='logout'),
    path('userget', userGetAPI.as_view(), name='userget'),
    path('useresetpass', userResetPasswordAPI.as_view(), name='resetPassword'),
    path('forgot-password/', userForgotPasswordSendEmailAPI.as_view(), name='forgotPassword'),
    path('forgot-password/reset/<uid>/<token>', userForgotPasswordResetAPI.as_view(), name='forgotPassword'),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'), # access token
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'), # refresh token
]