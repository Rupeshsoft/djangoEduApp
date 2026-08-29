import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'students',
    loadChildren: () => import('./students/students.module').then((m) => m.StudentsModule),
  },
  {
    path: 'professional-courses',
    loadChildren: () =>
      import('./courses/professional-courses/professional-courses.module').then(
        (m) => m.ProfessionalCoursesModule,
      ),
  },
  {
    path: 'contact',
    loadComponent: () => import('./contact/contact.component').then((m) => m.ContactComponent),
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home' },
];
