import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Course } from '../../course.model';
import { CourseService } from '../../course.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss']
})
export class CourseListComponent implements OnInit {
  courses$!: Observable<Course[]>;

  constructor(private svc: CourseService, private router: Router) {}

  ngOnInit() {
    this.courses$ = this.svc.getAll();
  }

  onEdit(id: string) {
    this.router.navigate(['/courses/admin', id, 'edit']);
  }

  onDelete(id: string) {
    if (confirm('Delete this course?')) {
      this.svc.delete(id);
    }
  }

  onNew() {
    this.router.navigate(['/courses/admin/new']);
  }
}
