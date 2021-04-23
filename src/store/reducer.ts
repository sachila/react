import { InitialState } from "./initialState";
import {
  AppActions,
  LOAD_CATEGORY,
  LOAD_CATEGORY_API,
  UPDATE_CATEGORY,
} from "./types";

export const initialState: InitialState = {
  categories: [],
  categoriesApiData: [],
};

const reducer = (
  state: InitialState = initialState,
  action: AppActions
): InitialState => {
  switch (action.type) {
    case UPDATE_CATEGORY: {
      const categories = [...state.categories];
      let category = categories.find((c) => c.id === action.item.id);
      if (!category) return state;

      const index = categories.indexOf(category);
      categories[index] = action.item;
      return {
        ...state,
        categories,
      };
    }

    case LOAD_CATEGORY: {
      return {
        ...state,
        categories: [...action.items],
      };
    }

    case LOAD_CATEGORY_API: {
      return {
        ...state,
        categoriesApiData: [...action.items],
      };
    }

    default:
      return state;
  }
};

export default reducer;
