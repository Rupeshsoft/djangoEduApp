import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink, RouterLinkActive } from '@angular/router';

interface NavItem {
  label: string;
  route: string;
}

@Component({
  selector: 'app-top-menu',
  standalone: true,
  imports: [CommonModule, MatIconModule, RouterLink, RouterLinkActive],
  templateUrl: './top-menu.component.html',
  styleUrl: './top-menu.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopMenuComponent {
  menuOpen = false;

  readonly navItems: NavItem[] = [
    { label: 'Home', route: '/home' },
    { label: 'Registered Professionals/Students', route: '/students' },
    { label: 'Professional Courses', route: '/professional-courses' },
    { label: 'Contact Us', route: '/contact' },
  ];

  trackByNavItem(_: number, item: NavItem): string {
    return item.route;
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu(): void {
    this.menuOpen = false;
  }
}
