from rest_framework_simplejwt.tokens import AccessToken
from ecommerce.models import User

token_str = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjk5MDgwMjEwLCJpYXQiOjE2OTkwNzkwMTAsImp0aSI6Ijc4ODEyOGUwODEzZDQ3YjJhMTM0ZWFkMDEwOWI4NzZmIiwidXNlcl9pZCI6Ik5vbmUifQ.DBMvqch8d7X4FCWaQaiWFNLdQwpWYjDLqSrSLJdHm00'
access_token = AccessToken(token_str)
user = User.objects.get(access_token['user_id'])
print(user)