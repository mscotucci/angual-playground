import { inject, Injectable, signal } from '@angular/core';
import { requestAdapterFactory } from '../../../../shared/http-interactions/shell/request-adapter-factory';
import { rxResource } from '@angular/core/rxjs-interop';
import { User } from '../../models/user.model';
import { of } from 'rxjs';
import { ToasterService } from '../../../../shared/ui/components/toaster/toaster.service';
import { setErrorMessage } from '../../../../shared/errors/errors-utility';
import { LoggerService } from '../../../../shared/logger/logger.service';

@Injectable({ providedIn: 'root' })
export class EditUserService {
  private url = 'https://dummyjson.com/users';
  private userId = signal<string | null>(null);

  private toasterService = inject(ToasterService);
  private logger = inject(LoggerService);
  //Create a request adapter for this url
  private requestAdapter = requestAdapterFactory(this.url);

  private usersResource = rxResource({
    request: () => this.userId(),
    loader: ({ request }) => {
      return request
        ? this.requestAdapter.executeGet<User>(
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

  updateUser(user: Partial<User>) {
    this.requestAdapter
      .executePut<User>(`${this.url}/${this.userId()}`, user)
      .subscribe({
        next: (response) => {
          this.user.set(response);
          this.logger.debug('Updated user:', response);
          this.toasterService.displayToast({
            message: 'User updated successfully',
            position: 'middle-center',
            type: 'success',
          });
        },
        error: (err) => {
          this.logger.error(setErrorMessage(err));
          this.toasterService.displayToast({
            message: 'An error occurred while updating the user',
            position: 'middle-center',
            type: 'error',
          });
        },
      });
  }
}
