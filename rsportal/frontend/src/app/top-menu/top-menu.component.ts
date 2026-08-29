import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

interface NavItem {
  label: string;
  route: string;
}

@Component({
  selector: 'app-top-menu',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './top-menu.component.html',
  styleUrl: './top-menu.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopMenuComponent {
  readonly navItems: NavItem[] = [
    { label: 'Home', route: '/home' },
    { label: 'Registered Professionals/Students', route: '/students' },
    { label: 'Professional Courses', route: '/professional-courses' },
    { label: 'Contact Us', route: '/contact' },
  ];

  trackByNavItem(_: number, item: NavItem): string {
    return item.route;
  }
}
