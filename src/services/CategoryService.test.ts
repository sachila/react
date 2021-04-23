import { ChangeEvent } from "react";
import { Category } from "../models/Category";
import { handleDeleteAll, handleSelectAll } from "./CategoryService";
import { catogories } from "./MockData";

describe("CategoryService", () => {
  it("handleSelectAll", () => {
    // const onChange = jest.fn();
    const event = {
      preventDefault() {},
      target: { checked: true },
    } as ChangeEvent<HTMLInputElement>;

    const itemsCategory: Category[] = [];
    handleSelectAll(
      event,
      (category) => {
        itemsCategory.push(category);
        expect(category.enabled).toBeTruthy();
      },
      catogories[0].childCategories
    );

    expect(itemsCategory.length).toBeGreaterThan(1);
  });

  it("handleDeletetAll", () => {
    // const onChange = jest.fn();
    const event = {
      preventDefault() {},
      target: { checked: true },
    } as ChangeEvent<HTMLInputElement>;

    const itemsCategory: Category[] = [];
    handleDeleteAll(
      true,
      false,
      (category) => {
        itemsCategory.push(category);
        expect(category.deleted).toBeTruthy();
        expect(category.enabled).toBeFalsy();
      },
      catogories[0].childCategories
    );

    expect(itemsCategory.length).toBeGreaterThan(1);
  });
});
