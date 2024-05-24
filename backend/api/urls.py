# myproject/urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('signup/', views.SignupView.as_view(), name='signup'),
    path('login/', views.LoginView.as_view(), name='login'),
    # 다른 URL 패턴들을 추가할 수 있습니다.
]