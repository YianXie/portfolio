from rest_framework import status
from rest_framework.authentication import TokenAuthentication
from rest_framework.decorators import (api_view, authentication_classes,
                                       permission_classes)
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .models import BlogPost
from .serializers import (BlogPostCreateSerializer, BlogPostDetailSerializer,
                          BlogPostListSerializer)


@api_view(["GET"])
def blog_list(request):
    posts = BlogPost.objects.all()
    serializer = BlogPostListSerializer(posts, many=True)
    return Response(serializer.data)


@api_view(["POST"])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def blog_create(request):
    serializer = BlogPostCreateSerializer(data=request.data)
    if serializer.is_valid():
        post = serializer.save()
        return Response(
            BlogPostDetailSerializer(post).data,
            status=status.HTTP_201_CREATED,
        )
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET"])
def blog_detail(request, slug):
    try:
        post = BlogPost.objects.get(slug=slug)
    except BlogPost.DoesNotExist:
        return Response(
            {"error": "Blog post not found."},
            status=status.HTTP_404_NOT_FOUND,
        )
    serializer = BlogPostDetailSerializer(post)
    return Response(serializer.data)
