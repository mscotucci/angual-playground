import { computed, Injectable, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ListUserItem } from '../../models/user.model';
import { PaginatedRequest } from '../../../../shared/http-interactions/models/paginated-request.model';
import { requestAdapterFactory } from '../../../../shared/http-interactions/shell/request-adapter-factory';
import { PaginatedResponse } from '../../../../shared/http-interactions/models/paginated-response.models';

@Injectable({ providedIn: 'root' })
export class ListUsersService {
  constructor() {}
  private searchTerm = signal<string | null>(null);
  private currentPage = signal<number>(1);
  private url = 'https://dummyjson.com/users/search';

  //Create a request adapter for this url
  private requestAdapter = requestAdapterFactory(this.url);

  //Initialize the resource for the paged users
  private usersResource = rxResource({
    request: () => {
      return {
        searchTerm: this.searchTerm(),
        page: this.currentPage(),
      };
    },
    loader: ({ request }) => {
      const paginatedRequest = {
        page: request.page,
        pageSize: 10,
        filters: { q: request.searchTerm ?? '' },
      } as PaginatedRequest;
      //Execute the request using the request adapter and map the response to appropriate format
      return this.requestAdapter.executePagination<ListUserItem>(
        this.url,
        paginatedRequest as PaginatedRequest,
        (response) =>
          resultAdapter(
            paginatedRequest.page,
            paginatedRequest.pageSize,
            response
          )
      );
    },
  });

  pagedUsers = computed(() => this.usersResource.value());
  isLoading = computed(() => this.usersResource.isLoading());
  errorMessage = this.usersResource.error;
  searchUsers(searchTerm: string) {
    this.searchTerm.set(searchTerm);
  }

  clearSearch() {
    this.searchTerm.set(null);
  }

  //Cause the current page is part of the resource request, changing it will trigger a new request to the server
  goToPreviousPage() {
    const currentPage = this.currentPage();
    if (currentPage > 1) {
      this.currentPage.set(currentPage - 1);
    }
  }

  goToNextPage() {
    const currentPage = this.currentPage();
    this.currentPage.set(currentPage + 1);
  }
}

function resultAdapter(
  page: number,
  pageSize: number,
  response: any
): PaginatedResponse<ListUserItem> {
  return {
    items: response.users as ListUserItem[],
    totalCount: response.total,
    page: page,
    pageSize: pageSize,
    totalPages: Math.ceil(response.total / pageSize),
    hasNextPage: response.skip + response.limit < response.total,
    hasPreviousPage: response.skip > 0,
  };
}
