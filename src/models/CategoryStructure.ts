import { Category } from "./Category";

export interface CategoryStructure extends Category {
  childCategories?: CategoryStructure[];
}
