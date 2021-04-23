import { Category } from "../models/Category";
import { CategoryStructure } from "../models/CategoryStructure";
import { catogories, catogoryApis } from "../services/MockData";
import reducer, { initialState } from "./reducer";
import { LOAD_CATEGORY, LOAD_CATEGORY_API, UPDATE_CATEGORY } from "./types";

describe("main reducer", () => {
  it(`should load category api data`, () => {
    const state = reducer(initialState, {
      type: LOAD_CATEGORY_API,
      items: catogoryApis,
    });
    expect(state.categoriesApiData.length).toBeGreaterThan(0);
    expect(state.categoriesApiData[0].id).toEqual("1");
  });

  it(`should load category structured data`, () => {
    const state = reducer(initialState, {
      type: LOAD_CATEGORY,
      items: catogories,
    });
    expect(state.categories.length).toBeGreaterThan(0);
    expect(state.categories[0].id).toEqual("1");
    expect(state.categories[0].childCategories?.length).toBeGreaterThan(0);
  });

  it(`should update category data data`, () => {
    const updatedCategory: CategoryStructure = {
      id: "1",
      count: 137,
      parent: "0",
      name: "test",
      childCategories: [],
    };

    const state1 = reducer(
      { ...initialState, categories: catogories },
      {
        type: UPDATE_CATEGORY,
        item: updatedCategory,
      }
    );
    expect(state1.categories.length).toBeGreaterThan(0);
    expect(state1.categories[0].id).toEqual("1");
    expect(state1.categories[0].name).toEqual("test");
  });
});
