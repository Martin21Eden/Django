from rest_framework.viewsets import ModelViewSet
from .models import Lyrics
from .serializers import LyricsSerializer, UserSerializer
from django.contrib.auth.models import User
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated
from .permissions import IsOwnerOrReadOnly, CreateOrReadOnly
from rest_framework.views import APIView
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
import urllib.request, json

url = 'https://api.audd.io/findLyrics/?q={}'


class APILyricsViewSet(ModelViewSet):
    queryset = Lyrics.objects.all()
    serializer_class = LyricsSerializer
    # permission_classes = (IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly)


class APIUserViewSet(ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (CreateOrReadOnly,)


class LyricsAPIToggle(APIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = LyricsSerializer

    def get(self, request, value):
        query = Lyrics.objects.get(name=value)
        if query:
            serializer = LyricsSerializer(query)
            return Response(serializer.data)
        else:
            webURL = urllib.request.urlopen(url=url.format(value))
            data = webURL.read()
            lyrics = json.loads(data.decode(webURL.info().get_content_charset('utf-8')))['result'][0]['lyrics']
            return Response({'name': value, 'text': lyrics})
