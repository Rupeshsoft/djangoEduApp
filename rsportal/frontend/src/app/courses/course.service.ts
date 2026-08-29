import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Course } from './course.model';

@Injectable({ providedIn: 'root' })
export class CourseService {
  private storageKey = 'rsportal_courses';
  private courses$ = new BehaviorSubject<Course[]>(this.load());

  private load(): Course[] {
    const raw = localStorage.getItem(this.storageKey);
    return raw ? (JSON.parse(raw) as Course[]) : [];
  }

  private saveAll(courses: Course[]) {
    localStorage.setItem(this.storageKey, JSON.stringify(courses));
    this.courses$.next(courses);
  }

  getAll(): Observable<Course[]> {
    return this.courses$.asObservable();
  }

  get(id: string): Course | undefined {
    return this.load().find((c) => c.id === id);
  }

  create(payload: Omit<Course, 'id'>): Course {
    const courses = this.load();
    const newCourse: Course = {
      ...payload,
      id: Date.now().toString(36) + Math.random().toString(36).slice(2, 8),
    };
    courses.push(newCourse);
    this.saveAll(courses);
    return newCourse;
  }

  update(id: string, patch: Partial<Course>) {
    const courses = this.load().map((c) => (c.id === id ? { ...c, ...patch } : c));
    this.saveAll(courses);
  }

  delete(id: string) {
    const courses = this.load().filter((c) => c.id !== id);
    this.saveAll(courses);
  }
}
