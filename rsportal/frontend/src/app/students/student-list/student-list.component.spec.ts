import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';
import { StudentListComponent } from './student-list.component';
import { StudentService } from '../student.service';

describe('StudentListComponent', () => {
  let component: StudentListComponent;
  let fixture: ComponentFixture<StudentListComponent>;
  let studentService: jasmine.SpyObj<StudentService>;

  beforeEach(async () => {
    studentService = jasmine.createSpyObj('StudentService', ['getStudents']);
    studentService.getStudents.and.returnValue(
      of([
        {
          id: 1,
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
        },
        {
          id: 2,
          first_name: 'Priya',
          last_name: 'Patel',
          email: 'priya@example.com',
          date_of_birth: '2001-02-02',
          gender: 'FEMALE',
          mobile: '9012345678',
          address: 'Mumbai',
          city: 'Mumbai',
          state: 'Maharashtra',
          pincode: '400001',
          education: [{ education_type: 'HSC', school_college_name: 'XYZ', total_marks: 500, gained_marks: 470 }],
        },
      ]),
    );

    await TestBed.configureTestingModule({
      imports: [StudentListComponent],
      providers: [
        provideRouter([]),
        { provide: StudentService, useValue: studentService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(StudentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load students on init', () => {
    expect(studentService.getStudents).toHaveBeenCalled();
  });

  it('should render registered students table', () => {
    const rows = fixture.nativeElement.querySelectorAll('tbody tr');
    expect(rows.length).toBe(2);
    expect(fixture.nativeElement.textContent).toContain('Registered Professionals / Students');
  });

  it('should filter students by keyword search', () => {
    component.searchTerm = 'priya';
    component.filterStudents();
    expect(component.filteredStudents.length).toBe(1);
    expect(component.filteredStudents[0].first_name).toBe('Priya');
  });

  it('should track by student id', () => {
    const id = component.trackByStudentId(0, {
      id: 5,
      first_name: 'Test',
      last_name: 'User',
      email: 'test@example.com',
      date_of_birth: '2002-03-03',
      gender: 'OTHER',
      mobile: '9988776655',
      address: 'Nagpur',
      city: 'Nagpur',
      state: 'Maharashtra',
      pincode: '440001',
      education: [],
    });
    expect(id).toBe(5);
  });
});
