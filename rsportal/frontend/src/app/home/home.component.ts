import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { RouterLink } from '@angular/router';
import { PlacementReportDialogComponent } from '../placement/placement-report-dialog.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatCardModule, MatIconModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  constructor(private readonly dialog: MatDialog) {}

  openPlacementReport(): void {
    this.dialog.open(PlacementReportDialogComponent, {
      width: 'min(94vw, 780px)',
      maxWidth: '94vw',
      autoFocus: 'first-tabbable',
      panelClass: 'placement-report-dialog-panel',
      data: { title: 'View Placement Report' },
    });
  }
}
