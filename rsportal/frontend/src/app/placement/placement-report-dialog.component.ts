import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { PlacementReportRequest, PlacementReportService } from './placement-report.service';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-placement-report-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatSnackBarModule,
    ReactiveFormsModule,
  ],
  templateUrl: './placement-report-dialog.component.html',
  styleUrl: './placement-report-dialog.component.scss',
})
export class PlacementReportDialogComponent {
  readonly requestForm;
  submitting = false;

  constructor(
    private readonly fb: FormBuilder,
    private readonly placementService: PlacementReportService,
    private readonly snackBar: MatSnackBar,
    private readonly dialogRef: MatDialogRef<PlacementReportDialogComponent>,
    @Inject(MAT_DIALOG_DATA) readonly data: { title: string },
  ) {
    this.requestForm = this.fb.nonNullable.group({
      name: ['', [Validators.required, Validators.maxLength(100)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      program: ['', Validators.required],
      graduation_year: [new Date().getFullYear(), [Validators.required, Validators.min(1950), Validators.max(2100)]],
      company: ['', [Validators.required, Validators.maxLength(120)]],
    });
  }

  submit(): void {
    if (this.requestForm.invalid || this.submitting) {
      this.requestForm.markAllAsTouched();
      return;
    }

    this.submitting = true;
    this.placementService.requestReport(this.requestForm.getRawValue() as PlacementReportRequest).subscribe({
      next: () => {
        this.snackBar.open('Placement report sent successfully.', 'Close', {
          duration: 4500,
          panelClass: ['success-snackbar'],
        });
        this.dialogRef.close(true);
      },
      error: (error) => {
        this.submitting = false;
        const message = this.formatError(error?.error) || 'Unable to request the placement report.';
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
      return Object.entries(error).map(([field, value]) => `${field}: ${this.formatError(value)}`).join(' ');
    }
    return '';
  }
}
