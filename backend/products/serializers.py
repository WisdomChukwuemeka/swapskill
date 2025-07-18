from rest_framework import serializers
from .models import Category, Skill, Booking
import os
# import mimetypes




# class VideoSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Video
#         fields = [
#             "id",
#             "file",
#             "title",
#             "description",
#         ]
#         read_only_fields = ["id"]

#     def validate_file(self, value):
#         print("DEBUG FILE:", value, "TYPE:", type(value))

#         if value in [None, ""]:
#             return None  # Allow empty

#         if not hasattr(value, "size"):
#             raise serializers.ValidationError("Invalid file type.")

#         if not isinstance(value.size, int):
#             raise serializers.ValidationError("File size must be int.")

#         if value.size < 2 * 1024 * 1024:
#             raise serializers.ValidationError("Video too small (min 2MB).")

#         if value.size > 100 * 1024 * 1024:
#             raise serializers.ValidationError("Video too big (max 100MB).")

#         # ✅ Check the file extension
#         valid_extensions = [".mp4", ".mov", ".avi", ".mkv"]
#         ext = os.path.splitext(value.name)[1].lower()
#         if ext not in valid_extensions:
#             raise serializers.ValidationError(
#                 f"Unsupported file extension '{ext}'. Allowed: {valid_extensions}"
#             )
#         return value





class BookingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booking
        fields = [
            'id',
            'skill',
            'note',
            'booking_date',
            'status',
            'created_at',
            'booking_user'
        ]
        read_only_fields = ['id', 'status', 'created_at', 'booking_user']

    def create(self, validated_data):
        validated_data['booking_user'] = self.context['request'].user
        validated_data['status'] = 'pending'
        return super().create(validated_data)


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = [
            'id',
            'category_name',
            'user',
            'skills',
        ]
        read_only_fields = ['id', 'user']
        
        
class SkillSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(write_only=True)

    class Meta:
        model = Skill
        fields = [
            'id',
            'category_name',
            'profile_image',
            'full_name',
            'bio',
            'certificate',
            'experience',
            'skills',
            'created_at',
        ]
        read_only_fields = ['id', 'created_at']

    def to_internal_value(self, data):
        data = super().to_internal_value(data)
        # 👇 decode JSON array if needed
        skills = data.get('skills')
        if isinstance(skills, str):
            import json
            try:
                data['skills'] = ', '.join(json.loads(skills))
            except Exception:
                pass
        return data

    def create(self, validated_data):
        category_name = validated_data.pop('category_name')
        user = self.context['request'].user

        category, _ = Category.objects.get_or_create(
            user=user,
            category_name=category_name
        )

        return Skill.objects.create(
            category=category,
            user=user,  # ✅ make sure your Skill has a `user` field!
            **validated_data
        )

class SkillsNestedSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)
    
    class Meta:
        model = Skill
        fields = [
            'id',
            'category',  # nested Category here
            'profile_image',
            'full_name',
            'bio',
            'certificate',
            'experience',
            'skills',
            'created_at',
        ]
    