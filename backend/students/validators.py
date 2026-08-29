from rest_framework import serializers
from .models import Student

def validate_marks(
    total_marks, gained_marks
):
    if total_marks <= 0:
        raise serializers.ValidationError("Total marks must be greater than zero.")
    if gained_marks < 0:
        raise serializers.ValidationError("Gained marks cannot be negative.")
    if gained_marks > total_marks:
        raise serializers.ValidationError("Gained marks cannot exceed total marks.")
    
    
def validate_cgpa(total_cgpa):    
    if total_cgpa is not None and (total_cgpa < 0 or total_cgpa > 10):
        raise serializers.ValidationError("CGPA must be between 0 and 10.Cant be greater than 10 or less than 0.")
    