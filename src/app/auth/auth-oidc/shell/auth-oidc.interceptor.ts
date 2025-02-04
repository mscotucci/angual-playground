import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandlerFn,
  HttpRequest,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { AuthUtils } from '../shared/util-auth';
import { OAuthService } from 'angular-oauth2-oidc';
import { Router } from '@angular/router';

export const authInterceptor = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  const authService = inject(OAuthService);

  // Clone the request object
  let newReq = req.clone();

  // Request
  //
  // If the access token didn't expire, add the Authorization header.
  // We won't add the Authorization header if the access token expired.
  // This will force the server to return a "401 Unauthorized" response
  // for the protected API routes which our response interceptor will
  // catch and delete the access token from the local storage while logging
  // the user out from the app.
  if (
    authService.getAccessToken() &&
    !AuthUtils.isTokenExpired(authService.getAccessToken())
  ) {
    newReq = req.clone({
      headers: req.headers.set(
        'Authorization',
        'Bearer ' + authService.getAccessToken()
      ),
    });
  }

  // Response
  return next(newReq).pipe(
    catchError((error) => {
      // Catch "401 Unauthorized" responses
      if (error instanceof HttpErrorResponse && error.status === 401) {
        // Sign out
        authService.logOut();

        // Reload the app
        location.reload();
      }
      // Catch "403 Forbidden" responses
      else if (error instanceof HttpErrorResponse && error.status === 403) {
        // Redirect to an unauthorized page
        inject(Router).navigate(['/unauthorized']);
      }

      return throwError(() => error);
    })
  );
};
