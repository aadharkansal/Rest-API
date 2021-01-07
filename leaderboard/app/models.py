from django.db import models

# Create your models here.

class Student(models.Model):
    roll_no = models.IntegerField(blank=False, default=0)
    name = models.CharField(max_length=10, blank=False, default='NO')
    marks_maths = models.IntegerField(blank=False, default=0)
    marks_physics = models.IntegerField(blank=False, default=0)
    marks_chem = models.IntegerField(blank=False, default=0)
    marks_total = models.IntegerField(blank=False, default=0)
    percent = models.FloatField(blank=False, default=0)

    def save(self, *args, **kwargs):
        self.marks_total = self.calculate_sum()
        self.percent = self.calcualte_percent()
        super(Student, self).save(*args, **kwargs)
    def calculate_sum(self):
        try:
            m = self.marks_maths
            p = self.marks_physics
            c = self.marks_chem
            return m+p+c
        except KeyError:
            return 0
    def calcualte_percent(self):
        try:
            m = float(self.marks_maths)
            p = float(self.marks_physics)
            c = float(self.marks_chem)
            return (m+p+c)/3
        except KeyError:
            return 0
