from django.urls import path
# internals
from api.views import UserView, TokenView, CodeExplainView

urlpatterns = [
    path('users/', UserView.as_view(), name='users'),
    path('tokens/', TokenView.as_view(), name='tokens'),
    path('code-explainer/', CodeExplainView.as_view(), name='code-explainer')
]