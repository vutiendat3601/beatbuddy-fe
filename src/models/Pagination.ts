interface Pagination {
  size: number;
  page: number;
  totalPages: number;
  numOfElements: number;
  totalElements: number;
}

const INITIAL_PAGINATION: Pagination = {
  size: 0,
  page: 0,
  totalPages: 0,
  numOfElements: 0,
  totalElements: 0,
};

export type { Pagination };
export { INITIAL_PAGINATION };
