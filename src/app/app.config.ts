import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { provideHttpClient } from '@angular/common/http';
import { provideAppConfig } from './app-config/app-config.provider';
import { environment } from './environments/environment';
import { appRoutes } from './app.routes';
import { provideOidcAuth } from './auth/auth-oidc/auth-oidc.provider';
import { provideLogger } from './logger/logger.provider';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes),
    provideHttpClient(),
    provideOidcAuth({
      ...environment.oidc,
    }),
    provideLogger(environment.logger),
    provideAppConfig(environment),
  ],
};
