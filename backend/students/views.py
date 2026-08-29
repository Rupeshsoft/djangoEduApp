from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status

from .models import AdvisorInquiry, Student
from .serializers import AdvisorInquirySerializer, StudentSerializer


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