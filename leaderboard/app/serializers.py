from rest_framework import serializers
from .models import Student

class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = ('roll_no','name','marks_maths','marks_physics','marks_chem','marks_total','percent')

