from rest_framework.routers import DefaultRouter

from .views import AdvisorInquiryViewSet, StudentViewSet


router = DefaultRouter()

router.register(
    "students",
    StudentViewSet,
    basename="students"
)

router.register(
    "advisor-inquiries",
    AdvisorInquiryViewSet,
    basename="advisor-inquiries"
)

urlpatterns = router.urls