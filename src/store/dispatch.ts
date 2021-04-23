import { LoadCategory, LoadCategoryApi, UpdateCategory } from "./types";

export type DispatchUpdateCategory = (args: UpdateCategory) => UpdateCategory;
export type DispatchLoadCategory = (args: LoadCategory) => LoadCategory;
export type DispatchLoadCategoryApiData = (
  args: LoadCategoryApi
) => LoadCategoryApi;

export type DispatchType =
  | DispatchUpdateCategory
  | DispatchLoadCategory
  | DispatchLoadCategoryApiData;
