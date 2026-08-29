import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { RouterOutlet } from '@angular/router';
import { AdvisorDialogComponent } from './advisor/advisor-dialog.component';
import { TopMenuComponent } from './top-menu/top-menu.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MatButtonModule, MatDialogModule, RouterOutlet, TopMenuComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  constructor(private readonly dialog: MatDialog) {}

  openAdvisorDialog(): void {
    this.dialog.open(AdvisorDialogComponent, {
      width: 'min(96vw, 980px)',
      maxWidth: '94vw',
      maxHeight: 'calc(100vh - 24px)',
      autoFocus: 'first-tabbable',
      panelClass: 'advisor-dialog-panel',
      data: { title: 'Talk to Our Advisor' },
    });
  }
}
