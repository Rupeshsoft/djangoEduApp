import smtplib

from django.conf import settings
from django.db import transaction
from django.core.mail import send_mail
from rest_framework import serializers, viewsets
from rest_framework.response import Response
from rest_framework import status

from .models import AdvisorInquiry, PlacementReportRequest, Student
from .serializers import AdvisorInquirySerializer, PlacementReportRequestSerializer, StudentSerializer


class StudentViewSet(
    viewsets.ModelViewSet
):

    queryset = (
        Student.objects
        .prefetch_related("educations")
        .all()
    )

    serializer_class = StudentSerializer

    def destroy(
        self,
        request,
        *args,
        **kwargs
    ):

        instance = self.get_object()

        instance.delete()

        return Response(
            {
                "message":
                    "Student deleted successfully."
            },
            status=status.HTTP_200_OK
        )


class AdvisorInquiryViewSet(viewsets.ModelViewSet):
    queryset = AdvisorInquiry.objects.all()
    serializer_class = AdvisorInquirySerializer
    http_method_names = ["post", "get", "head", "options"]


class PlacementReportRequestViewSet(viewsets.ModelViewSet):
    queryset = PlacementReportRequest.objects.all()
    serializer_class = PlacementReportRequestSerializer
    http_method_names = ["post", "get", "head", "options"]

    @transaction.atomic
    def perform_create(self, serializer):
        if not settings.EMAIL_HOST_USER or not settings.EMAIL_HOST_PASSWORD:
            raise serializers.ValidationError({
                "email": (
                    "Email delivery is not configured. Set "
                    "DJANGO_EMAIL_HOST_USER and DJANGO_EMAIL_HOST_PASSWORD."
                )
            })

        request_record = serializer.save()
        try:
            send_mail(
                subject="Your RS Portal placement report request",
                message=(
                    f"Hello {request_record.name},\n\n"
                    "Thank you for requesting the RS Portal placement report. "
                    "Our team will share the latest report with you shortly.\n\n"
                    "RS Portal"
                ),
                from_email=settings.DEFAULT_FROM_EMAIL,
                recipient_list=[request_record.email],
                html_message=(
                    f"<p>Hello {request_record.name},</p>"
                    "<p>Thank you for requesting the RS Portal placement report. "
                    "Our team will share the latest report with you shortly.</p>"
                    "<p>RS Portal</p>"
                ),
                fail_silently=False,
            )
        except smtplib.SMTPAuthenticationError as exc:
            raise serializers.ValidationError({
                "email": "Gmail authentication failed. Use the sender account's App Password."
            }) from exc
        except smtplib.SMTPException as exc:
            raise serializers.ValidationError({
                "email": "The email provider rejected the message. Check SMTP settings."
            }) from exc