interface Metadata {
  size: number;
  page: number;
  totalPages: number;
  numOfElements: number;
  totalElements: number;
}
interface Pagination<T> {
  items: T[];
  metadata: Metadata;
}

const INITIAL_PAGINATION: Metadata = {
  size: 0,
  page: 0,
  totalPages: 0,
  numOfElements: 0,
  totalElements: 0,
};

export type { Metadata, Pagination };
export { INITIAL_PAGINATION };
