import { inject, Inject, Injectable } from '@angular/core';
import { Observable, catchError, from, of, tap, throwError } from 'rxjs';
import { OidcConfigurations } from '../shared/config-oidc';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';
import { AuthUtils } from '../shared/util-auth';
import { LoggerService } from '../../../logger/logger.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private _authenticated: boolean = false;
  private _config: OidcConfigurations;

  loggedIn: boolean = false;

  accessToken: any;
  logger = inject(LoggerService);

  constructor(
    @Inject('config') private config: OidcConfigurations,
    private oauthService: OAuthService
  ) {
    this._config = config;
    this.configureOAuth();
  }

  private _roles: string[] = [];

  get roles(): string[] {
    return this._roles;
  }

  public hasRole(role: string): boolean {
    return this._roles.includes(role);
  }

  public hasAnyRole(roles: string[]): boolean {
    return roles.some((role) => this._roles.includes(role));
  }

  private updateRoles() {
    const token = this.oauthService.getAccessToken();
    if (token) {
      this._roles = AuthUtils.getRolesFromToken(token);
    } else {
      this._roles = [];
    }
  }

  public login(): Observable<boolean> {
    return from(
      this.oauthService.loadDiscoveryDocumentAndLogin({
        onTokenReceived: (tokenParams) => {
          this.accessToken = tokenParams.accessToken;
        },
      })
    ).pipe(
      tap((res) => {
        if (res) {
          this._authenticated = true;
          this.updateRoles();
        }
      }),
      catchError((error) => {
        this.logger.error(error);
        return throwError(() => error);
      })
    );
  }

  public logoff() {
    this.oauthService.logOut();
    this._roles = [];
  }

  check(): Observable<boolean> {
    // Check if the user is logged in
    if (this._authenticated) {
      return of(true);
    }

    // Check the access token availability
    if (!this.oauthService.getAccessToken()) {
      return of(false);
    }

    // Check the access token expire date
    if (AuthUtils.isTokenExpired(this.oauthService.getAccessToken())) {
      // If the access token exists, and it is expired, sign in using refresh token
      this.logger.debug(
        'implementare refresh token',
        this.oauthService.getAccessToken()
      );

      return of(false);
    }
    return of(true);
  }

  private configureOAuth() {
    const authCodeFlowConfig: AuthConfig = {
      // Url of the Identity Provider
      issuer: this._config.issuer,

      // URL of the SPA to redirect the user to after login
      redirectUri: this._config.redirect_uri,

      // The SPA's id. The SPA is registerd with this id at the auth-server
      // clientId: 'server.code',
      clientId: this._config.clientId,

      // Just needed if your auth server demands a secret. In general, this
      // is a sign that the auth server is not configured with SPAs in mind
      // and it might not enforce further best practices vital for security
      // such applications.
      // dummyClientSecret: 'secret',

      responseType: this._config.responseType,

      // set the scope for the permissions the client should request
      // The first four are defined by OIDC.
      // Important: Request offline_access to get a refresh token
      // The api scope is a usecase specific one
      scope: this._config.scope,

      showDebugInformation: true,
      skipIssuerCheck: this._config.skipIssuerCheck,
      strictDiscoveryDocumentValidation:
        this._config.strictDiscoveryDocumentValidation,
      resource: this._config.resource,
    };
    this.oauthService.configure(authCodeFlowConfig);
    this.oauthService.loadDiscoveryDocumentAndTryLogin();
  }
}
