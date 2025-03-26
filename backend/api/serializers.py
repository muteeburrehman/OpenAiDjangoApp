# api/serializers.py
from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate

# Use relative import for internal models
from .models import CodeExplainer, UserProfile


class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ['bio', 'api_usage_count']
        extra_kwargs = {'api_usage_count': {'read_only': True}}  # Users cannot modify



class CodeExplainSerializer(serializers.ModelSerializer):
    class Meta:
        model = CodeExplainer
        fields = ["id", "_input", "_output", "created_at", "updated_at"]
        extra_kwargs = {
            "_output": {"read_only": True},
            "created_at": {"read_only": True},
            "updated_at": {"read_only": True}
        }

    def create(self, validated_data):
        request = self.context.get("request")
        user = request.user if request and hasattr(request, "user") else None

        ce = CodeExplainer(user=user, **validated_data)

        from .utils import send_code_to_api
        output = send_code_to_api(validated_data["_input"]) or "Error: Unable to generate output."
        ce._output = output

        # Update the user's API usage count
        if user and user.is_authenticated:
            profile, created = UserProfile.objects.get_or_create(user=user)
            profile.api_usage_count += 1
            profile.save()

        ce.save()
        return ce


class UserSerializer(serializers.ModelSerializer):
    profile = UserProfileSerializer(read_only=True)

    class Meta:
        model = User
        fields = ["id", "username", "email", "password", "profile"]
        extra_kwargs = {
            "password": {"write_only": True}
        }

    def create(self, validated_data):
        password = validated_data.pop("password")
        user = User.objects.create(**validated_data)
        # Save the password as hashed
        user.set_password(password)
        user.save()
        # Create token for authentication
        Token.objects.create(user=user)
        # Create user profile
        UserProfile.objects.create(user=user)
        return user


class TokenSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(style={"input_type": "password"}, trim_whitespace=False)

    def validate(self, attrs):
        username = attrs.get("username")
        password = attrs.get("password")
        user = authenticate(request=self.context.get("request"), username=username, password=password)
        if not user:
            msg = "Credentials are not provided correctly..."
            raise serializers.ValidationError(msg, code="authentication")
        attrs["user"] = user
        return attrs