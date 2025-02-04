import { Observable } from 'rxjs';
import { PaginatedRequest } from '../models/paginated-request.model';
import { PaginatedResponse } from '../models/paginated-response.models';

export interface RequestAdapter {
  executePagination<T>(
    url: string,
    request: PaginatedRequest,
    responseAdapter: (response: any) => PaginatedResponse<T>
  ): Observable<PaginatedResponse<T>>;

  execute<T>(url: string, responseAdapter: (response: any) => T): Observable<T>;
}
