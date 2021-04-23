import { useSelector } from "react-redux";
import { catogories, catogoryApis } from "../services/MockData";
import { InitialState } from "../store/initialState";
import { act, renderHook } from "@testing-library/react-hooks";
import {
  useBuildedCategoryData,
  useCategoryDataStructure,
  useEnabledCategories,
} from "./CategoryHook";

jest.mock("react-redux", () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

const mockState: InitialState = {
  categories: catogories,
  categoriesApiData: catogoryApis,
};

describe("Category hook", () => {
  beforeEach(() => {
    (useSelector as jest.Mock).mockImplementation((callback) => {
      return callback(mockState);
    });
  });

  it(`useEnabledCategories`, () => {
    const { result } = renderHook(() => useEnabledCategories(), {});
    const enabled = result.current.enableList;
    const deleted = result.current.deletedList;

    expect(enabled.length).toBeGreaterThan(0);
    expect(enabled[0].id).toEqual("1");

    expect(deleted.length).toEqual(1);
    expect(deleted[0].id).toEqual("4");
  });

  it(`useBuildedCategoryData`, () => {
    const { result } = renderHook(() => useBuildedCategoryData(), {});
    const categoryStructure = result.current;

    expect(categoryStructure.length).toBeGreaterThan(0);
    expect(categoryStructure[0].id).toEqual("1");

    const childrens = categoryStructure[0]?.childCategories || [];
    expect(childrens.length).toBeGreaterThan(0);
    expect(childrens[0].id).toEqual("2");
  });

  it(`useCategoryDataStructure`, () => {
    const { result } = renderHook(() => useCategoryDataStructure(), {});
    const rootCategories = result.current.rootCategories;
    const childCategories = result.current.childCategories;

    expect(rootCategories.length).toBeGreaterThan(0);
    expect(rootCategories[0].id).toEqual("1");

    expect(childCategories.length).toBeGreaterThan(0);
    expect(childCategories[0].id).toEqual("2");
  });
});
