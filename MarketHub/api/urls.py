from django.contrib import admin
from django.urls import path
from ecommerce.views import registerAPI, loginAPI, logoutAPI, userGetAPI

urlpatterns = [
    path('register', registerAPI.as_view(), name='register'),
    path('login', loginAPI.as_view(), name='login'),
    path('logout', logoutAPI.as_view(), name='logout'),
    path('userget', userGetAPI.as_view(), name='logout'),
]