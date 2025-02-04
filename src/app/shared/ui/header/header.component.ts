import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeSwitcherComponent } from '../components/theme-switcher/theme-switcher.component';
import { AppConfigService } from '../../app-config/app-config.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, ThemeSwitcherComponent],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  private appConfigService = inject(AppConfigService);
  appName = this.appConfigService.getConfig().appName;
}
