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
  production: true,
  baseApiUrl: '',
  oidc: {
    issuer: '6',
    jwks_uri: '',
    clientId: '',
    redirect_uri: '',
    scope: 'openid profile email',
    strictDiscoveryDocumentValidation: false,
    skipIssuerCheck: true,
    resource: '',
  },
  logger: {
    level: LogLevel.Error, // Only log errors in production
  },
  theme: 'light', // Default theme
  appName: 'Applicazione di test',
};
