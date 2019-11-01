from rest_framework.viewsets import ModelViewSet
from .models import Post
from .serializers import PostSerializer, UserSerializer
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from .permissions import IsOwnerOrReadOnly, CreateOrReadOnly
from django.contrib.auth import get_user_model
from django.http import Http404
from django.shortcuts import redirect

User = get_user_model()


class APIPostViewSet(ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = (IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly)


class APIUserViewSet(ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (CreateOrReadOnly,)


class GetUserData(APIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = UserSerializer

    def get(self, request):
        obj = get_object_or_404(User, username=request.user)
        serializer = UserSerializer(obj)
        return Response(serializer.data)


class PostLikeDislikeAPIToggle(APIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = PostSerializer

    def get(self, request, pk, LikeOrUnlike):
        obj = get_object_or_404(Post, pk=pk)
        user = request.user

        if LikeOrUnlike == 'like':
            if user in obj.likes.all():
                obj.likes.remove(user)
            else:
                obj.likes.add(user)
            if user in obj.unlikes.all():
                obj.unlikes.remove(user)
        elif LikeOrUnlike == 'unlike':
            if user in obj.unlikes.all():
                obj.unlikes.remove(user)
            else:
                obj.unlikes.add(user)
            if user in obj.likes.all():
                obj.likes.remove(user)

        obj.like = obj.likes.count()
        obj.unlike = obj.unlikes.count()
        obj.save()
        serializer = PostSerializer(obj)
        return Response(serializer.data)


def verify(request, uuid):
    try:
        user = User.objects.get(verification_uuid=uuid, is_verified=False)
    except User.DoesNotExist:
        raise Http404("User does not exist or is already verified")

    user.is_verified = True
    user.save()

    return redirect('/')
