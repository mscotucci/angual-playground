import { Routes } from '@angular/router';
import { UsersComponent } from './users.component';
import { ListUsersComponent } from './list/list-users.component';
import { EditUserComponent } from './edit/edit-user.component';
import { UserResolverService } from './edit/shell/user-resolver.service';

export default [
  {
    path: '',
    component: UsersComponent,
    children: [
      {
        path: '',
        component: ListUsersComponent,
        children: [
          {
            path: 'edit-user/:id',
            component: EditUserComponent,
            resolve: {
              user: UserResolverService,
            },
          },
        ],
      },
    ],
  },
] as Routes;
