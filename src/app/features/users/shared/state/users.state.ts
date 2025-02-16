import { PaginatedResponse } from '../../../../shared/http-interactions/models/paginated-response.models';
import { ListUserItem, User } from '../../models/user.model';

export interface UsersState {
  isLoading?: boolean;
  error?: string;
  pagedUsers?: PaginatedResponse<ListUserItem>;
  selectedUser?: User;
}
