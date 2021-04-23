import { Category } from "../models/Category";
import { CategoryStructure } from "../models/CategoryStructure";

export const UPDATE_CATEGORY = "UPDATE_CATEGORY";
export const LOAD_CATEGORY = "LOAD_CATEGORY";
export const LOAD_CATEGORY_API = "LOAD_CATEGORY_API";

export type UpdateCategory = {
  type: typeof UPDATE_CATEGORY;
  item: CategoryStructure;
};

export type LoadCategory = {
  type: typeof LOAD_CATEGORY;
  items: CategoryStructure[];
};
export type LoadCategoryApi = {
  type: typeof LOAD_CATEGORY_API;
  items: Category[];
};

export type AppActions = UpdateCategory | LoadCategory | LoadCategoryApi;
