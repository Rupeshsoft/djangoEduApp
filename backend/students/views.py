from django.conf import settings
from django.core.mail import send_mail
from rest_framework import viewsets
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

    def perform_create(self, serializer):
        request_record = serializer.save()
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