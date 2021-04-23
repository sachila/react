import { Category } from "../models/Category";
import { CategoryStructure } from "../models/CategoryStructure";
import {
  DispatchLoadCategory,
  DispatchLoadCategoryApiData,
  DispatchUpdateCategory,
} from "./dispatch";
import {
  LoadCategory,
  LoadCategoryApi,
  LOAD_CATEGORY,
  LOAD_CATEGORY_API,
  UpdateCategory,
  UPDATE_CATEGORY,
} from "./types";

export function updateCategory(item: CategoryStructure) {
  return (dispatch: DispatchUpdateCategory) => {
    const action: UpdateCategory = {
      type: UPDATE_CATEGORY,
      item,
    };
    dispatch(action);
  };
}
export function loadCategoryStructuredData(items: CategoryStructure[]) {
  return (dispatch: DispatchLoadCategory) => {
    const action: LoadCategory = {
      type: LOAD_CATEGORY,
      items,
    };
    dispatch(action);
  };
}

export function loadCategoryApiData(items: Category[]) {
  return (dispatch: DispatchLoadCategoryApiData) => {
    const action: LoadCategoryApi = {
      type: LOAD_CATEGORY_API,
      items,
    };
    dispatch(action);
  };
}
