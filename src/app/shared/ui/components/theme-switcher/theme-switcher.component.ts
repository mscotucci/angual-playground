import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppConfigService } from '../../../app-config/app-config.service';

@Component({
  selector: 'theme-switcher',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './theme-switcher.component.html',
  styleUrls: [],
})
export class ThemeSwitcherComponent {
  private appConfig = inject(AppConfigService);

  readonly themes = [
    'light',
    'dark',
    'cupcake',
    'bumblebee',
    'emerald',
    'corporate',
    'synthwave',
    'retro',
    'cyberpunk',
    'valentine',
    'halloween',
    'garden',
    'forest',
    'aqua',
    'lofi',
    'pastel',
    'fantasy',
    'wireframe',
    'black',
    'luxury',
    'dracula',
    'cmyk',
    'autumn',
    'business',
    'acid',
    'lemonade',
    'night',
    'coffee',
    'winter',
    'dim',
    'nord',
    'sunset',
  ] as const;

  readonly currentTheme = this.appConfig.theme;

  setTheme(theme: string) {
    this.appConfig.setTheme(theme);
  }
}
