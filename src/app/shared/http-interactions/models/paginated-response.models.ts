export interface PaginatedResponse<T> {
  page?: number;

  /// <summary>
  /// The size of this page.
  /// </summary>
  pageSize?: number;

  /// <summary>
  /// The total number of pages available.
  /// </summary>
  totalPages?: number;

  /// <summary>
  /// The total number of records available.
  /// </summary>
  totalCount?: number;

  /// <summary>
  /// The URL to the next page - if null, there are no more pages.
  /// </summary>
  nextPageUrl?: string;

  /// <summary>
  /// The records this page represents.
  /// </summary>
  items?: T[];

  hasNextPage?: boolean;
  hasPreviousPage?: boolean;
}
