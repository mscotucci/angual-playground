import { InjectionToken } from '@angular/core';

export interface AppConfig {
  theme: string;
  appName: string;
}

export const APP_CONFIG = new InjectionToken<AppConfig>('APP_CONFIG');
