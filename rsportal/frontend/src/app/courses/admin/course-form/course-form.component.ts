import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from '../../course.service';
import { Course } from '../../course.model';

@Component({
  selector: 'app-course-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss']
})
export class CourseFormComponent implements OnInit {
  model: Partial<Course> = {};
  editId?: string;

  constructor(private route: ActivatedRoute, private router: Router, private svc: CourseService) {}

  ngOnInit() {
    this.route.paramMap.subscribe((pm) => {
      const id = pm.get('id');
      if (id) {
        this.editId = id;
        const c = this.svc.get(id);
        if (c) {
          this.model = { ...c };
        }
      }
    });
  }

  save() {
    if (this.editId) {
      this.svc.update(this.editId, this.model as Partial<Course>);
    } else {
      this.svc.create(this.model as Omit<Course, 'id'>);
    }
    this.router.navigate(['/courses/admin']);
  }

  cancel() {
    this.router.navigate(['/courses/admin']);
  }
}
