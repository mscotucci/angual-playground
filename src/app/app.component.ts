import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ToasterWrapperComponent } from './shared/ui/components/toaster/toast-wrapper.component';
import { LayoutComponent } from './shared/ui/layout/layout.component';
import { MenuService } from './shared/ui/sidebar/shell/menu.service';

@Component({
  standalone: true,
  imports: [LayoutComponent, RouterModule, ToasterWrapperComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  private menuService = inject(MenuService);

  constructor() {
    this.menuService.setMenuItems([
      { id: 'home', label: 'Home', icon: 'home', route: '/home' },
      { id: 'users', label: 'Users', icon: 'users', route: '/users' },
      {
        id: 'assessments',
        label: 'Assessments',
        icon: 'users',
        children: [
          {
            id: 'maturity-assessments',
            label: 'Assessment di maturità',
            icon: 'film',
            route: '/maturity-assessments',
          },
        ],
      },
      {
        id: 'star-wars',
        label: 'Star Wars Films',
        icon: 'film',
        children: [
          { id: 'films', label: 'Films', icon: 'film', route: '/films' },
        ],
      },
      {
        id: 'settings',
        label: 'Settings',
        icon: 'cog',
        children: [
          {
            id: 'profile',
            label: 'Profile',
            icon: 'user',
            route: '/settings/profile',
          },
          {
            id: 'security',
            label: 'Security',
            icon: 'shield-check',
            route: '/settings/security',
          },
        ],
      },
    ]);
  }
}
