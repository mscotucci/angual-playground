import { Injectable, signal } from '@angular/core';
import { requestAdapterFactory } from '../../../../shared/http-interactions/shell/request-adapter-factory';
import { rxResource } from '@angular/core/rxjs-interop';
import { User } from '../../models/user.model';
import { of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class EditUserService {
  private url = 'https://dummyjson.com/users';
  private userId = signal<string | null>(null);

  //Create a request adapter for this url
  private requestAdapter = requestAdapterFactory(this.url);

  private usersResource = rxResource({
    request: () => this.userId(),
    loader: ({ request }) => {
      return request
        ? this.requestAdapter.execute<User>(
            `${this.url}/${request}`,
            (response) => response
          )
        : of(undefined);
    },
  });

  user = this.usersResource.value;
  isLoading = this.usersResource.isLoading;
  errorMessage = this.usersResource.error;

  resetEdit() {
    this.user.set(undefined);
    this.userId.set(null); //Set to null to avoid missing load for same id
  }

  setUserId(userId: string | null) {
    this.userId.set(userId);
  }
}
