from rest_framework import serializers
from .models import Lyrics, Profile


class LyricsSerializer(serializers.ModelSerializer):

    class Meta:
        model = Lyrics
        fields = ('id', 'name', 'text', 'date_posted', 'video_url', 'audio_url', 'author')


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = Profile
        fields = ('id', 'username', 'email', 'first_name', 'last_name', 'password', 'dictionary')
        write_only_fields = ('password',)
        read_only_fields = ('id',)

    # def create(self, validated_data):
    #     user = User.objects.create(
    #         username=validated_data['username'],
    #         email=validated_data['email'],
    #         first_name=validated_data['first_name'],
    #         last_name=validated_data['last_name']
    #     )
    #     user.set_password(validated_data['password'])
    #     user.save()
    #     return user
