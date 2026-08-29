import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Student, StudentRegistrationPayload } from '../student.model';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-student-form',
  standalone: true,
  imports: [CommonModule, MatSnackBarModule, ReactiveFormsModule, RouterLink],
  templateUrl: './student-form.component.html',
  styleUrl: './student-form.component.scss',
})
export class StudentFormComponent implements OnInit {
  readonly educationTypes = ['SSC', 'HSC', 'GRADUATION'];
  readonly studentForm: FormGroup;
  studentId: number | null = null;

  constructor(
    private readonly fb: FormBuilder,
    private readonly studentService: StudentService,
    private readonly snackBar: MatSnackBar,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
  ) {
    this.studentForm = this.fb.group({
      first_name: ['', Validators.required],
      middle_name: [''],
      last_name: ['', Validators.required],
      date_of_birth: ['', Validators.required],
      gender: ['MALE', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      address: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      pincode: ['', [Validators.required, Validators.pattern(/^\d{6}$/)]],
      education: this.fb.array(
        this.educationTypes.map((educationType) => this.createEducationGroup(educationType)),
        Validators.required,
      ),
    });
  }

  ngOnInit(): void {
    const rawId = this.route.snapshot.paramMap.get('id');
    const id = rawId ? Number(rawId) : null;
    this.studentId = id;

    if (id) {
      this.studentService.getStudentById(id).subscribe((student) => this.populateForm(student));
    }
  }

  get education(): FormArray {
    return this.studentForm.get('education') as FormArray;
  }

  addEducationRow(): void {
    const selectedTypes = this.education.controls.map(
      (control) => control.get('education_type')?.value,
    );
    const nextType = this.educationTypes.find((type) => !selectedTypes.includes(type));

    if (nextType) {
      this.education.push(this.createEducationGroup(nextType));
    }
  }

  removeEducationRow(index: number): void {
    if (this.education.length > 1) {
      this.education.removeAt(index);
    }
  }

  submit(): void {
    if (this.studentForm.invalid) {
      this.studentForm.markAllAsTouched();
      return;
    }

    const payload = this.studentForm.getRawValue() as StudentRegistrationPayload;
    const request$ = this.studentId
      ? this.studentService.updateStudent(this.studentId, payload)
      : this.studentService.createStudent(payload);

    request$.subscribe({
      next: () => {
        this.snackBar.open(
          this.studentId ? 'Student updated successfully.' : 'Student registered successfully.',
          'Close',
          { duration: 4000, panelClass: ['success-snackbar'] },
        );
        this.router.navigate(['/students']);
      },
      error: (error) => {
        const message = this.formatApiError(error?.error);
        this.snackBar.open(message, 'Close', {
          duration: 6000,
          panelClass: ['error-snackbar'],
        });
        this.studentForm.setErrors({ submitFailed: message });
      },
    });
  }

  private formatApiError(error: unknown): string {
    if (typeof error === 'string') {
      return error;
    }

    if (Array.isArray(error)) {
      return error.map((item) => this.formatApiError(item)).filter(Boolean).join(' ');
    }

    if (error && typeof error === 'object') {
      return Object.entries(error)
        .map(([field, value]) => {
          const message = this.formatApiError(value);
          return field === 'non_field_errors' ? message : `${field}: ${message}`;
        })
        .filter(Boolean)
        .join(' ');
    }

    return '';
  }

  private createEducationGroup(educationType = 'SSC'): FormGroup {
    return this.fb.group({
      education_type: [educationType, Validators.required],
      school_college_name: ['', Validators.required],
      total_marks: [0, [Validators.required, Validators.min(1)]],
      gained_marks: [0, [Validators.required, Validators.min(0)]],
      total_cgpa: [null],
    });
  }

  private populateForm(student: Student): void {
    this.studentForm.patchValue({
      first_name: student.first_name,
      middle_name: student.middle_name ?? '',
      last_name: student.last_name,
      date_of_birth: student.date_of_birth,
      gender: student.gender,
      email: student.email,
      mobile: student.mobile,
      address: student.address,
      city: student.city,
      state: student.state,
      pincode: student.pincode,
    });

    this.education.clear();
    (student.education ?? []).forEach((item) => {
      this.education.push(
        this.fb.group({
          education_type: [item.education_type, Validators.required],
          school_college_name: [item.school_college_name, Validators.required],
          total_marks: [item.total_marks, [Validators.required, Validators.min(1)]],
          gained_marks: [item.gained_marks, [Validators.required, Validators.min(0)]],
          total_cgpa: [item.total_cgpa ?? null],
        }),
      );
    });

    if (this.education.length === 0) {
      this.education.push(this.createEducationGroup());
    }
  }
}
