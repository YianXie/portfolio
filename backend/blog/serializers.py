from rest_framework import serializers

from .models import BlogPost


class BlogPostListSerializer(serializers.ModelSerializer):
    class Meta:
        model = BlogPost
        fields = ["id", "title", "slug", "created_at", "updated_at"]


class BlogPostDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = BlogPost
        fields = ["id", "title", "slug", "content", "created_at", "updated_at"]


class BlogPostCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = BlogPost
        fields = ["title", "content"]

    def validate_title(self, value):
        if BlogPost.objects.filter(title=value).exists():
            raise serializers.ValidationError(
                "A blog post with this title already exists."
            )
        return value
