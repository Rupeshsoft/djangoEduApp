import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';
import { StudentService } from '../student.service';
import { StudentFormComponent } from './student-form.component';

describe('StudentFormComponent', () => {
  let component: StudentFormComponent;
  let fixture: ComponentFixture<StudentFormComponent>;
  let studentService: jasmine.SpyObj<StudentService>;

  beforeEach(async () => {
    studentService = jasmine.createSpyObj('StudentService', ['createStudent', 'getStudentById', 'updateStudent']);
    studentService.createStudent.and.returnValue(
      of({
        id: 10,
        first_name: 'Amit',
        last_name: 'Sharma',
        email: 'amit@example.com',
        date_of_birth: '2000-01-01',
        gender: 'MALE',
        mobile: '9876543210',
        address: 'Pune',
        city: 'Pune',
        state: 'Maharashtra',
        pincode: '411001',
        education: [{ education_type: 'SSC', school_college_name: 'ABC', total_marks: 500, gained_marks: 450 }],
      }),
    );

    await TestBed.configureTestingModule({
      imports: [StudentFormComponent],
      providers: [
        provideRouter([]),
        { provide: StudentService, useValue: studentService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(StudentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add an education row', () => {
    component.removeEducationRow(2);
    component.addEducationRow();
    expect(component.education.length).toBe(3);
  });

  it('should submit a valid student form', () => {
    component.studentForm.patchValue({
      first_name: 'Amit',
      last_name: 'Sharma',
      date_of_birth: '2000-01-01',
      gender: 'MALE',
      email: 'amit@example.com',
      mobile: '9876543210',
      address: 'Pune',
      city: 'Pune',
      state: 'Maharashtra',
      pincode: '411001',
    });

    component.education.controls.forEach((education, index) => {
      education.patchValue({
        school_college_name: `${index + 1} School`,
        total_marks: 500,
        gained_marks: 450,
        total_cgpa: 9,
      });
    });

    component.submit();

    expect(studentService.createStudent).toHaveBeenCalled();
  });
});
