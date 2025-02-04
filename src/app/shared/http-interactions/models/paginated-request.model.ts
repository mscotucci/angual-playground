export interface PaginatedRequest {
  page: number;
  pageSize: number;
  filters?: Record<string, string>;
}
