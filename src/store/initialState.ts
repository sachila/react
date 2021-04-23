import { Category } from "../models/Category";
import { CategoryStructure } from "../models/CategoryStructure";

export type InitialState = {
  categories: CategoryStructure[];
  categoriesApiData: Category[];
};
