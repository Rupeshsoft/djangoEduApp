import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { CourseListComponent } from './admin/course-list/course-list.component';
import { CourseFormComponent } from './admin/course-form/course-form.component';

const routes: Routes = [
  { path: '', redirectTo: 'admin', pathMatch: 'full' },
  { path: 'admin', component: CourseListComponent },
  { path: 'admin/new', component: CourseFormComponent },
  { path: 'admin/:id/edit', component: CourseFormComponent },
];

@NgModule({
  imports: [CommonModule, FormsModule, RouterModule.forChild(routes), CourseListComponent, CourseFormComponent]
})
export class CoursesModule {}
