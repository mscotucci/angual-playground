import { Injectable, inject, signal, computed } from '@angular/core';
import { APP_CONFIG, AppConfig } from './app-config.types';

@Injectable({
  providedIn: 'root',
})
export class AppConfigService {
  private config = inject(APP_CONFIG);
  private themeSignal = signal<string>(this.config.theme);

  readonly theme = computed(() => this.themeSignal());

  getConfig(): AppConfig {
    return this.config;
  }

  setTheme(theme: string): void {
    this.config.theme = theme;
    this.themeSignal.set(theme);
  }
}
