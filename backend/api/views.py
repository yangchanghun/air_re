# users/views.py
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from .models import User
from .serializers import UserSerializer, LoginSerializer

class SignupView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):  # 수정
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response({"message": "회원가입 성공"}, status=status.HTTP_201_CREATED)

class LoginView(generics.GenericAPIView):
    serializer_class = LoginSerializer
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data  # 이 부분을 인증된 사용자 객체로 수정해야 합니다.
        refresh = RefreshToken.for_user(user)
        return Response({
            "message": "로그인 성공",
            "token": str(refresh.access_token),
            "user": serializer.data  # serializer.data를 사용하여 사용자 정보를 응답합니다.
        })

class DeleteUserView(generics.DestroyAPIView):
    queryset = User.objects.all()
    permission_classes = [IsAuthenticated]

    def delete(self, request, *args, **kwargs):
        user = self.get_object()
        user.delete()
        return Response({"message": "User deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
