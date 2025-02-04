import { map, Observable } from 'rxjs';
import { PaginatedRequest } from '../models/paginated-request.model';
import { PaginatedResponse } from '../models/paginated-response.models';
import { RequestAdapter } from './request-adapter';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';

export class DummyJsonRequestAdapter implements RequestAdapter {
  private http = inject(HttpClient);

  executePagination<T, TPaginatedRequest extends PaginatedRequest>(
    url: string,
    request: TPaginatedRequest,
    responseAdapter: (item: any) => PaginatedResponse<T>
  ): Observable<PaginatedResponse<T>> {
    const skip = (request.page - 1) * request.pageSize;
    return this.http
      .get<PaginatedResponse<T>>(
        `${url}?limit=${request.pageSize}&skip=${skip}&${new URLSearchParams(
          request.filters
        ).toString()}`
      )
      .pipe(
        map((response) => {
          return responseAdapter(response);
        })
      );
  }

  execute<T>(
    url: string,
    responseAdapter: (response: any) => T
  ): Observable<T> {
    return this.http.get<T>(`${url}`).pipe(
      map((response) => {
        return responseAdapter(response);
      })
    );
  }
}
