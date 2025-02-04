import { effect, inject, Injectable } from '@angular/core';
import { ListUsersService } from '../../list/shell/list-users.service';
import { EditUserService } from '../../edit/shell/edit-user.service';
import { LoggerService } from '../../../../shared/logger/logger.service';

@Injectable({ providedIn: 'root' })
export class UsersFacadeService {
  private listUsersService = inject(ListUsersService);
  private editUserService = inject(EditUserService);
  private logger = inject(LoggerService);

  //List Users functionalities
  pagedUsers = this.listUsersService.pagedUsers;
  isLoadingListUsers = this.listUsersService.isLoading;
  errorMessageListUsers = this.listUsersService.errorMessage;
  searchUsers(searchTerm: string) {
    this.listUsersService.searchUsers(searchTerm);
  }

  clearSearch() {
    this.listUsersService.clearSearch();
  }

  //Cause the current page is part of the resource request, changing it will trigger a new request to the server
  goToPreviousPage() {
    this.listUsersService.goToPreviousPage();
  }

  goToNextPage() {
    this.listUsersService.goToNextPage();
  }

  //User Details functionalities
  eff = effect(() => {
    this.logger.debug(
      'UsersFacadeService: Selected User',
      this.editUserService.user()
    );
  });
  selectedUser = this.editUserService.user;
  isLoadingUser = this.editUserService.isLoading;
  errorMessageUser = this.editUserService.errorMessage;

  resetSelectedUser() {
    this.editUserService.resetEdit();
  }
}
