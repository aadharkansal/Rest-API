from django.shortcuts import render

# Create your views here.
from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser 
from rest_framework import status

from .models import Student
from .serializers import StudentSerializer
from rest_framework.decorators import api_view

@api_view(['GET', 'POST', 'DELETE'])
def student_list(request):
    if request.method == 'GET':
        student = Student.objects.all().order_by('-marks_total')
        # print(type(student))
        rollno = request.GET.get('roll_no',None)
        if rollno is not None:
            student = student.filter(roll_no=rollno)
        student_serializer = StudentSerializer(student,many=True)
        return JsonResponse(student_serializer.data,safe=False)
    elif request.method == 'POST':
        student_data = JSONParser().parse(request)
        student_serializer = StudentSerializer(data=student_data)
        if student_serializer.is_valid():
            student_serializer.save()
            return JsonResponse(student_serializer.data,status=status.HTTP_201_CREATED)
        return JsonResponse(student_serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        count = Student.objects.all().delete()
        return JsonResponse({'message': '{} Students were deleted successfully!'.format(count[0])}, status=status.HTTP_204_NO_CONTENT)

@api_view(['GET', 'PUT', 'DELETE'])
def student_detail(request,pk=None):
    try:
        student = Student.objects.get(roll_no = pk)
        print(student)
        if request.method == 'GET':
            student_serializer = StudentSerializer(student)
            return JsonResponse(student_serializer.data)
        elif request.method == 'PUT':
            student_data = JSONParser().parse(request)
            student_serializer = StudentSerializer(student,data=student_data)
            print(student_serializer)
            if student_serializer.is_valid():
                student_serializer.save()
                return JsonResponse(student_serializer.data)
            return JsonResponse(student_serializer.errors, status=status.HTTP_400_BAD_REQUEST) 
        elif request.method == 'DELETE':
            student.delete() 
            return JsonResponse({'message': 'Student was deleted successfully!'}, status=status.HTTP_204_NO_CONTENT)
    except:
        return JsonResponse({'message':'Student doesnot exist'},status=status.HTTP_404_NOT_FOUND)
    
