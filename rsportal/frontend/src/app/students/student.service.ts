import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Student, StudentRegistrationPayload } from './student.model';

@Injectable({ providedIn: 'root' })
export class StudentService {
  private readonly apiUrl = 'http://localhost:8000/api/students/';

  constructor(private readonly http: HttpClient) {}

  getStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(this.apiUrl);
  }

  getStudentById(id: number): Observable<Student> {
    return this.http.get<Student>(`${this.apiUrl}${id}/`);
  }

  createStudent(student: StudentRegistrationPayload): Observable<Student> {
    return this.http.post<Student>(this.apiUrl, student);
  }

  updateStudent(id: number, student: StudentRegistrationPayload): Observable<Student> {
    return this.http.put<Student>(`${this.apiUrl}${id}/`, student);
  }

  deleteStudent(id: number): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.apiUrl}${id}/`);
  }
}
