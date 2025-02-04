import { inject } from '@angular/core';
import { CanActivateFn, CanActivateChildFn, Router } from '@angular/router';
import { AuthService } from '../data-access/auth.service';

export function RoleGuard(
  allowedRoles: string[]
): CanActivateFn | CanActivateChildFn {
  return (route, state) => {
    const authService = inject(AuthService);
    const router = inject(Router);

    if (!authService.hasAnyRole(allowedRoles)) {
      // Redirect to an unauthorized page or home page
      return router.createUrlTree(['/unauthorized']);
    }

    return true;
  };
}
