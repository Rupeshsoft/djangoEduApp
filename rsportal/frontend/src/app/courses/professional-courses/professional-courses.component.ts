import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

interface CourseItem {
  title: string;
  level: string;
  duration: string;
  format: string;
}

@Component({
  selector: 'app-professional-courses',
  standalone: true,
  imports: [CommonModule, FormsModule, MatCardModule, MatFormFieldModule, MatInputModule],
  templateUrl: './professional-courses.component.html',
  styleUrl: './professional-courses.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfessionalCoursesComponent {
  readonly courses: CourseItem[] = [
    { title: 'Full Stack Development', level: 'Advanced', duration: '12 weeks', format: 'Hybrid' },
    { title: 'Data Science', level: 'Intermediate', duration: '10 weeks', format: 'Online' },
    { title: 'Cloud Computing', level: 'Advanced', duration: '8 weeks', format: 'Weekend' },
    { title: 'UI/UX Design', level: 'Beginner', duration: '6 weeks', format: 'Blended' },
  ];

  searchTerm = '';
  visibleCourses: CourseItem[] = [...this.courses];

  filterCourses(): void {
    const term = this.searchTerm.trim().toLowerCase();
    this.visibleCourses = !term
      ? [...this.courses]
      : this.courses.filter((course) =>
          [course.title, course.level, course.duration, course.format].join(' ').toLowerCase().includes(term),
        );
  }

  trackByCourseTitle(_: number, course: CourseItem): string {
    return course.title;
  }
}
