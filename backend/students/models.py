from django.db import models


class Student(models.Model):

    GENDER_CHOICES = [
        ('MALE', 'Male'),
        ('FEMALE', 'Female'),
        ('OTHER', 'Other'),
    ]

    first_name = models.CharField(max_length=50)
    middle_name = models.CharField(max_length=50, blank=True, default='')
    last_name = models.CharField(max_length=50)
    email = models.EmailField(max_length=100, unique=True)
    date_of_birth = models.DateField()
    gender = models.CharField(max_length=10, choices=GENDER_CHOICES)
    mobile = models.CharField(max_length=15, unique=True)

    address = models.TextField()
    city = models.CharField(max_length=50)
    state = models.CharField(max_length=50)
    pincode = models.CharField(max_length=6)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'students'
        ordering = ['-id']
        verbose_name = 'Student'
        verbose_name_plural = 'Students'

    def __str__(self):
        return f"{self.first_name} {self.last_name}"


class StudentEducation(models.Model):

    EDUCATION_CHOICES = [
        ("SSC", "SSC"),
        ("HSC", "HSC"),
        ("GRADUATION", "Graduation"),
    ]

    student = models.ForeignKey(
        'Student',
        on_delete=models.CASCADE,
        related_name='educations'
    )

    education_type = models.CharField(max_length=20, choices=EDUCATION_CHOICES)
    school_college_name = models.CharField(max_length=100)
    total_marks = models.DecimalField(max_digits=10, decimal_places=2)
    gained_marks = models.DecimalField(max_digits=10, decimal_places=2)
    total_cgpa = models.DecimalField(max_digits=4, decimal_places=2, blank=True, null=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'student_educations'
        constraints = [
            models.UniqueConstraint(
                fields=['student', 'education_type'],
                name='unique_student_education'
            )
        ]

    def __str__(self):
        return f"{self.student.first_name} {self.student.last_name} - {self.education_type}"
