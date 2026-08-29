import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { App } from './app';
import { HomeComponent } from './home/home.component';
import { StudentListComponent } from './students/student-list/student-list.component';
import { ProfessionalCoursesComponent } from './courses/professional-courses/professional-courses.component';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App, HomeComponent, StudentListComponent, ProfessionalCoursesComponent],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render the main navigation links', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const links = Array.from(
      fixture.nativeElement.querySelectorAll('a') as NodeListOf<HTMLAnchorElement>,
    ).map((link) => link.textContent?.trim());

    expect(links).toContain('Home');
    expect(links).toContain('Registered Professionals/Students');
    expect(links).toContain('Professional Courses');
    expect(links).toContain('Contact Us');
  });

  it('should expose the registered students component', () => {
    expect(StudentListComponent).toBeTruthy();
  });

  it('should expose the professional courses component', () => {
    expect(ProfessionalCoursesComponent).toBeTruthy();
  });
});
