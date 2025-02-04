import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { toObservable } from '@angular/core/rxjs-interop';
import { searchInput } from './shell/utility-functions';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { User } from '../models/user.model';
import { UsersFacadeService } from '../shared/shell/users-facade.service';
import { LoggerService } from '../../../shared/logger/logger.service';
import { DrawerComponent } from '../../../shared/ui/components/drawer/drawer.component';

@Component({
  selector: 'app-list-users',
  standalone: true,
  imports: [CommonModule, FormsModule, DrawerComponent, RouterOutlet],
  templateUrl: './list-users.component.html',
  styleUrl: './list-users.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListUsersComponent {
  logger = inject(LoggerService);

  router = inject(Router);
  route = inject(ActivatedRoute);

  service = inject(UsersFacadeService);
  pagedUsers = this.service.pagedUsers;
  searchTerm = signal<string | null>(null);
  selectedUser = this.service.selectedUser;

  isLoading = computed(
    () => this.service.isLoadingListUsers() || this.service.isLoadingUser()
  );

  isDrawerOpen = computed(() => {
    if (this.selectedUser()) {
      return true;
    }
    return false;
  });

  constructor() {
    toObservable(this.searchTerm)
      .pipe(searchInput())
      .subscribe((value) =>
        !!value ? this.service.searchUsers(value!) : this.service.clearSearch()
      );
  }

  onSearchTermChange(term: KeyboardEvent) {
    this.searchTerm.set((term.target as HTMLInputElement).value);
  }

  goToPreviousPage() {
    this.service.resetSelectedUser();
    this.service.goToPreviousPage();
  }

  goToNextPage() {
    this.service.resetSelectedUser();
    this.service.goToNextPage();
  }

  /**
   * Navigate to user-edit route
   * @param item
   * @see UserResolverService
   */
  handleEdit(item: User) {
    this.router.navigate(['edit-user', item.id], {
      relativeTo: this.route,
    });
  }

  handleBeforeDrawerClose() {
    this.logger.debug('Drawer is about to close');
    this.router.navigate(['.'], { relativeTo: this.route }).then(() => {
      this.service.resetSelectedUser();
    });
  }
}
