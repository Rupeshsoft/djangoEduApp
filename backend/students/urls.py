from rest_framework.routers import DefaultRouter

from .views import AdvisorInquiryViewSet, PlacementReportRequestViewSet, StudentViewSet


router = DefaultRouter()

router.register(
    "students",
    StudentViewSet,
    basename="students"
)

router.register(
    "placement-report-requests",
    PlacementReportRequestViewSet,
    basename="placement-report-requests"
)

router.register(
    "advisor-inquiries",
    AdvisorInquiryViewSet,
    basename="advisor-inquiries"
)

urlpatterns = router.urls