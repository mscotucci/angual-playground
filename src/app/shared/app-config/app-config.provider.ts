import { Provider } from '@angular/core';
import { AppConfigService } from './app-config.service';
import { APP_CONFIG, AppConfig } from './app-config.types';

export function provideAppConfig(config: AppConfig): Provider[] {
  return [
    AppConfigService,
    {
      provide: APP_CONFIG,
      useValue: config,
    },
  ];
}
