import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { User } from '../../models/user.model';
import { EditUserService } from './edit-user.service';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserResolverService implements Resolve<User | undefined> {
  private editUserService = inject(EditUserService);

  resolve(route: ActivatedRouteSnapshot): Observable<User | undefined> {
    const id = route.paramMap.get('id');
    this.editUserService.setUserId(id);
    return of(this.editUserService.user());
  }
}
