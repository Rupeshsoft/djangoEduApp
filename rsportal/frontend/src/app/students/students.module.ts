import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentListComponent } from './student-list/student-list.component';
import { StudentFormComponent } from './student-form/student-form.component';

const routes: Routes = [
  { path: '', component: StudentListComponent },
  { path: 'register', component: StudentFormComponent },
  { path: ':id/edit', component: StudentFormComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes), StudentListComponent, StudentFormComponent],
})
export class StudentsModule {}
