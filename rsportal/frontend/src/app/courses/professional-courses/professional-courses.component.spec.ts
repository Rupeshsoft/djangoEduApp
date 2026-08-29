import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfessionalCoursesComponent } from './professional-courses.component';

describe('ProfessionalCoursesComponent', () => {
  let component: ProfessionalCoursesComponent;
  let fixture: ComponentFixture<ProfessionalCoursesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfessionalCoursesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProfessionalCoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should expose a list of professional courses', () => {
    expect(component.courses.length).toBeGreaterThan(0);
    expect(component.courses[0].title).toContain('Full Stack');
  });

  it('should render course cards in the template', () => {
    const cards = fixture.nativeElement.querySelectorAll('.course-card');
    expect(cards.length).toBe(component.courses.length);
    expect(fixture.nativeElement.textContent).toContain('Professional Courses');
  });

  it('should filter courses by keyword search', () => {
    component.searchTerm = 'data';
    component.filterCourses();
    expect(component.visibleCourses.length).toBe(1);
    expect(component.visibleCourses[0].title).toContain('Data Science');
  });
});
