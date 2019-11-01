from rest_framework import serializers
from .models import Post
from django.contrib.auth import get_user_model
User = get_user_model()


class PostSerializer(serializers.ModelSerializer):
    author = serializers.CharField(default=serializers.CurrentUserDefault())

    class Meta:
        model = Post
        fields = ('id', 'title', 'content', 'date_posted', 'like', 'unlike', 'author')


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'first_name', 'last_name', 'is_verified', 'password')
        read_only_fields = ('id',)
