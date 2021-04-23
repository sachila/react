export interface Category {
  id: string;
  count: number;
  parent: string;
  name: string;
  enabled?: boolean;
  deleted?: boolean;
}
