import { inject } from '@angular/core';
import { CanActivateChildFn, CanActivateFn, Router } from '@angular/router';
import { catchError, of, switchMap } from 'rxjs';
import { AuthService } from '../data-access/auth.service';
import { LoggerService } from '../../../logger/logger.service';

export const AuthGuard: CanActivateFn | CanActivateChildFn = (route, state) => {
  const authService = inject(AuthService);
  const logger = inject(LoggerService);
  const router = inject(Router);

  return authService.check().pipe(
    switchMap((authenticated) => {
      // If the user is not authenticated...
      if (!authenticated) {
        return authService.login();
      }

      // Allow the access
      return of(true);
    }),
    catchError((error) => {
      logger.error(error);
      return of(router.createUrlTree(['/unauthorized']));
    })
  );
};
