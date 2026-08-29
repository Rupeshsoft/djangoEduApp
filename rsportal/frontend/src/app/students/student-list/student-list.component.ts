import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { Student } from '../student.model';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-student-list',
  standalone: true,
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatInputModule, RouterLink],
  templateUrl: './student-list.component.html',
  styleUrl: './student-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StudentListComponent implements OnInit {
  students$!: Observable<Student[]>;
  filteredStudents: Student[] = [];
  searchTerm = '';
  private allStudents: Student[] = [];

  constructor(private readonly studentService: StudentService) {}

  ngOnInit(): void {
    this.students$ = this.studentService.getStudents().pipe(
      tap((students) => {
        this.allStudents = students;
        this.filterStudents();
      }),
    );
  }

  filterStudents(): void {
    const term = this.searchTerm.trim().toLowerCase();

    this.filteredStudents = !term
      ? [...this.allStudents]
      : this.allStudents.filter((student) =>
          [
            student.first_name,
            student.last_name,
            student.email,
            ...(student.education ?? []).map((item) => item.education_type),
          ]
            .join(' ')
            .toLowerCase()
            .includes(term),
        );
  }

  trackByStudentId(_: number, student: Student): number {
    return student.id ?? 0;
  }
}
