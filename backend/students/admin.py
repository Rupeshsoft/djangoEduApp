from django.contrib import admin

from .models import AdvisorInquiry, Student, StudentEducation


@admin.register(Student)
class StudentAdmin(admin.ModelAdmin):
	list_display = ("first_name", "last_name", "email", "mobile", "city")
	search_fields = ("first_name", "last_name", "email", "mobile")


@admin.register(StudentEducation)
class StudentEducationAdmin(admin.ModelAdmin):
	list_display = ("student", "education_type", "school_college_name")
	list_filter = ("education_type",)


@admin.register(AdvisorInquiry)
class AdvisorInquiryAdmin(admin.ModelAdmin):
	list_display = ("name", "email", "phone", "program", "created_at")
	search_fields = ("name", "email", "phone", "company")
