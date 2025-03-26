# api/urls.py
from django.urls import path
from .views import UserView, TokenView, CodeExplainView, UserProfileView

urlpatterns = [
    path('users/', UserView.as_view(), name='users'),
    path('tokens/', TokenView.as_view(), name='tokens'),
    path('code-explain/', CodeExplainView.as_view(), name='code-explain'),
    path('profile/', UserProfileView.as_view(), name='user-profile'),
]