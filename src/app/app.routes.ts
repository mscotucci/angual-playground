import { Route } from '@angular/router';
import { HomeComponent } from './home.component';
import { NotFoundComponent } from './ui/not-found/not-found.component';
import { UnauthorizedComponent } from './auth/auth-oidc/ui/components/unauthorized.component';

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
