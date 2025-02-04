// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { AppConfig } from '../shared/app-config/app-config.types';
import { LogLevel } from '../shared/logger/logger.config';

export const environment: AppConfig & {
  production: boolean;
  baseApiUrl: string;
  oidc: {
    issuer: string;
    jwks_uri: string;
    clientId: string;
    redirect_uri: string;
    scope: string;
    strictDiscoveryDocumentValidation: boolean;
    skipIssuerCheck: boolean;
    resource: string;
  };
  logger: {
    level: LogLevel;
  };
} = {
  production: false,
  baseApiUrl: '',
  oidc: {
    issuer: '',
    jwks_uri: '',
    clientId: '',
    redirect_uri: 'http://localhost:4200',
    scope: 'openid profile email',
    strictDiscoveryDocumentValidation: false,
    skipIssuerCheck: true,
    resource: '',
  },
  logger: {
    level: LogLevel.Debug, // Set the default log level for development
  },
  theme: 'emerald', // Default theme
  appName: 'Applicazione di test',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
