import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private theme = signal('light');

  setTheme(newTheme: string) {
    this.theme.set(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  }

  getTheme() {
    return this.theme();
  }
}
