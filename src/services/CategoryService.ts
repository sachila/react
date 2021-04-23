import { ChangeEvent } from "react";
import { CategoryStructure } from "../models/CategoryStructure";

export const handleSelectAll = (
  event: ChangeEvent<HTMLInputElement>,
  dispatchCallback: (category: CategoryStructure) => void,
  categories?: CategoryStructure[]
) => {
  const checked = event.target.checked;
  categories?.forEach((cat) => {
    if (!cat.deleted) handleRecursiveSelectAll(cat, checked, dispatchCallback);
  });
};

const handleRecursiveSelectAll = async (
  category: CategoryStructure,
  checked: boolean,
  dispatchCallback: (category: CategoryStructure) => void
) => {
  if (!category.childCategories || !category.childCategories.length) {
    category.enabled = checked;
    dispatchCallback(category);
  }
  category.childCategories?.forEach(async (cat) => {
    handleRecursiveSelectAll(cat, checked, dispatchCallback);

    category.enabled = checked;
    dispatchCallback(category);
  });
};

export const handleDeleteAll = (
  deleted: boolean,
  enabled: boolean,
  dispatchCallback: (category: CategoryStructure) => void,
  categories?: CategoryStructure[]
) => {
  categories?.forEach((cat) => {
    handleRecursiveDeleteAll(cat, deleted, enabled, dispatchCallback);
  });
};

const handleRecursiveDeleteAll = async (
  category: CategoryStructure,
  deleted: boolean,
  enabled: boolean,
  dispatchCallback: (category: CategoryStructure) => void
) => {
  if (!category.childCategories || !category.childCategories.length) {
    category.deleted = deleted;
    category.enabled = enabled;
    dispatchCallback(category);
  }
  category.childCategories?.forEach(async (cat) => {
    handleRecursiveSelectAll(cat, deleted, dispatchCallback);

    category.deleted = deleted;
    category.enabled = enabled;
    dispatchCallback(category);
  });
};
