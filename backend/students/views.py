from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status

from .models import Student
from .serializers import StudentSerializer


class StudentViewSet(
    viewsets.ModelViewSet
):

    queryset = (
        Student.objects
        .prefetch_related("education")
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