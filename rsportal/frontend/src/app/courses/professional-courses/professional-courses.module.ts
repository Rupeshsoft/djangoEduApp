import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfessionalCoursesComponent } from './professional-courses.component';

const routes: Routes = [{ path: '', component: ProfessionalCoursesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes), ProfessionalCoursesComponent],
})
export class ProfessionalCoursesModule {}
