import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AdvisorInquiry, AdvisorService } from './advisor.service';

@Component({
  selector: 'app-advisor-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatSnackBarModule, ReactiveFormsModule],
  templateUrl: './advisor-dialog.component.html',
  styleUrl: './advisor-dialog.component.scss',
})
export class AdvisorDialogComponent {
  readonly inquiryForm;
  submitting = false;

  constructor(
    private readonly fb: FormBuilder,
    private readonly advisorService: AdvisorService,
    private readonly snackBar: MatSnackBar,
    private readonly dialogRef: MatDialogRef<AdvisorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) readonly data: { title: string },
  ) {
    this.inquiryForm = this.fb.nonNullable.group({
      name: ['', [Validators.required, Validators.maxLength(100)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      job_title: ['', [Validators.required, Validators.maxLength(120)]],
      program: ['', Validators.required],
      graduation_year: [new Date().getFullYear(), [Validators.required, Validators.min(1950), Validators.max(2100)]],
      company: ['', [Validators.required, Validators.maxLength(120)]],
    });
  }

  submit(): void {
    if (this.inquiryForm.invalid || this.submitting) {
      this.inquiryForm.markAllAsTouched();
      return;
    }

    this.submitting = true;
    this.advisorService.requestCall(this.inquiryForm.getRawValue() as AdvisorInquiry).subscribe({
      next: () => {
        this.snackBar.open('Your advisor request was submitted successfully.', 'Close', {
          duration: 4500,
          panelClass: ['success-snackbar'],
        });
        this.dialogRef.close(true);
      },
      error: (error) => {
        this.submitting = false;
        const message = this.formatError(error?.error) || 'Unable to submit your request.';
        this.snackBar.open(message, 'Close', {
          duration: 6000,
          panelClass: ['error-snackbar'],
        });
      },
    });
  }

  private formatError(error: unknown): string {
    if (typeof error === 'string') return error;
    if (Array.isArray(error)) return error.map((item) => this.formatError(item)).join(' ');
    if (error && typeof error === 'object') {
      return Object.entries(error)
        .map(([field, value]) => `${field}: ${this.formatError(value)}`)
        .join(' ');
    }
    return '';
  }
}
