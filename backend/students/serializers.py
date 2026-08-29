from rest_framework import serializers
from django.db import transaction

from .models import (
    Student,
    StudentEducation,
    AdvisorInquiry,
)

from .validators import (
    validate_marks,
    validate_cgpa
)


class StudentEducationSerializer(
    serializers.ModelSerializer
):

    class Meta:
        model = StudentEducation

        fields = [
            "id",
            "education_type",
            "school_college_name",
            "total_marks",
            "gained_marks",
            "total_cgpa",
        ]

    def validate(self, attrs):

        validate_marks(
            attrs.get("total_marks"),
            attrs.get("gained_marks")
        )

        validate_cgpa(
            attrs.get("total_cgpa")
        )

        return attrs


class AdvisorInquirySerializer(serializers.ModelSerializer):
    class Meta:
        model = AdvisorInquiry
        fields = [
            "id",
            "name",
            "email",
            "phone",
            "job_title",
            "program",
            "graduation_year",
            "company",
            "created_at",
        ]
        read_only_fields = ["id", "created_at"]

    def validate_graduation_year(self, value):
        if value < 1950 or value > 2100:
            raise serializers.ValidationError("Enter a valid graduation year.")
        return value


class StudentSerializer(
    serializers.ModelSerializer
):

    education = StudentEducationSerializer(
        many=True,
        source="educations",
        required=False,
        allow_null=True,
    )

    class Meta:

        model = Student

        fields = [
            "id",
            "first_name",
            "middle_name",
            "last_name",
            "date_of_birth",
            "gender",
            "email",
            "mobile",
            "address",
            "city",
            "state",
            "pincode",
            "education",
            "created_at",
            "updated_at",
        ]

        read_only_fields = [
            "id",
            "created_at",
            "updated_at",
        ]

    def validate_mobile(self, value):

        if not value.isdigit():
            raise serializers.ValidationError(
                "Mobile number must contain digits only."
            )

        if len(value) != 10:
            raise serializers.ValidationError(
                "Mobile number must contain 10 digits."
            )

        return value

    def validate_pincode(self, value):

        if not value.isdigit():
            raise serializers.ValidationError(
                "Pincode must contain digits only."
            )

        if len(value) != 6:
            raise serializers.ValidationError(
                "Pincode must contain 6 digits."
            )

        return value

    def validate(self, attrs):

        education = attrs.get(
            "educations",
            []
        )

        if not education:
            return attrs

        education_types = [
            item["education_type"]
            for item in education
        ]

        if len(education_types) != len(
            set(education_types)
        ):
            raise serializers.ValidationError({
                "education":
                    "Duplicate education type is not allowed."
            })

        required_types = {
            "SSC",
            "HSC",
            "GRADUATION"
        }

        supplied_types = set(
            education_types
        )

        missing = (
            required_types -
            supplied_types
        )

        if missing:
            raise serializers.ValidationError({
                "education":
                    f"Missing education: {', '.join(missing)}"
            })

        return attrs

    @transaction.atomic
    def create(self, validated_data):

        education_data = validated_data.pop(
            "educations",
            []
        )

        student = Student.objects.create(
            **validated_data
        )

        for education in education_data:

            StudentEducation.objects.create(
                student=student,
                **education
            )

        return student

    @transaction.atomic
    def update(
        self,
        instance,
        validated_data
    ):

        education_data = validated_data.pop(
            "educations",
            None
        )

        for attr, value in validated_data.items():
            setattr(
                instance,
                attr,
                value
            )

        instance.save()

        if education_data is not None:

            for education in education_data:

                education_type = (
                    education["education_type"]
                )

                StudentEducation.objects.update_or_create(
                    student=instance,
                    education_type=education_type,
                    defaults={
                        "school_college_name":
                            education[
                                "school_college_name"
                            ],

                        "total_marks":
                            education[
                                "total_marks"
                            ],

                        "gained_marks":
                            education[
                                "gained_marks"
                            ],

                        "total_cgpa":
                            education.get(
                                "total_cgpa"
                            ),
                    }
                )

        return instance