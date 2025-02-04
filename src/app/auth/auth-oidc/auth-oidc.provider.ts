import { Provider, EnvironmentProviders, ENVIRONMENT_INITIALIZER, inject } from '@angular/core';
import { OidcConfigurations } from './shared/config-oidc';
import { AuthService } from './data-access/auth.service';
import { provideOAuthClient } from 'angular-oauth2-oidc';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './shell/auth-oidc.interceptor';

export const provideOidcAuth = (
    config: OidcConfigurations
): Array<Provider | EnvironmentProviders> => {
    const providers: Array<Provider | EnvironmentProviders> = [
        AuthService, { provide: 'config', useValue: config },
        provideHttpClient(withInterceptors([authInterceptor])),
        provideOAuthClient()
    ];
    return providers;
};
