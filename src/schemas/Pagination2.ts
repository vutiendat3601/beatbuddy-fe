interface Pagination<T> {
  items: T[];
  page: number;
  size: number;
  numOfItems: number;
  totalItems: number;
  totalPages: number;
}

const EMPTY_PAGINATION: Pagination<never> = {
  items: [],
  page: 0,
  size: 0,
  numOfItems: 0,
  totalItems: 0,
  totalPages: 0,
};

export { EMPTY_PAGINATION };

export default Pagination;