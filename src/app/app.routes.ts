import { Route } from '@angular/router';
import { HomeComponent } from './home.component';
import { UnauthorizedComponent } from './shared/auth/auth-oidc/ui/components/unauthorized.component';
import { NotFoundComponent } from './shared/ui/not-found/not-found.component';

export const appRoutes: Route[] = [
  {
    path: '',
    component: HomeComponent,
    // canActivate: [AuthGuard, RoleGuard(['ADMIN'])],
    // canActivateChild: [AuthGuard],
  },
  {
    path: 'users',
    loadChildren: () => import('./features/users/users.routes'),
  },
  { path: 'unauthorized', component: UnauthorizedComponent },
  {
    path: '**',
    component: NotFoundComponent,
  },
];
