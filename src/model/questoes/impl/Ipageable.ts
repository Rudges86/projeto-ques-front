export interface IPageable{
  first?: boolean;
  last?: boolean;
  size?: number;
  totalPages?: number;
  totalElements?: number;
  page?: number;
  pageElements?: number;
}
