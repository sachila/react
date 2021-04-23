import { Checkbox } from "@material-ui/core";
import React, { ChangeEvent } from "react";
import { useDispatch } from "react-redux";
import { CategoryStructure } from "../../models/CategoryStructure";
import { handleSelectAll } from "../../services/CategoryService";
import { updateCategory } from "../../store/actions";
import {
  ChildCategoryWrapper,
  FormControlLabelSelectAllContainer,
} from "../../styles/elements";
import { CategoryCheckboxFacets } from "./CategoryCheckboxFacets";

interface Props {
  category: CategoryStructure;
}

export const CategoryChildCheckboxFacets: React.FC<Props> = (props) => {
  const { category } = props;
  const dispatch = useDispatch();

  if (!category || !category.childCategories) {
    return null;
  }
  if (!category.enabled) return null;
  if (category.deleted) return null;

  const allChildrensAreSelected = (category: CategoryStructure): boolean => {
    if (!category.childCategories) return false;
    return category.childCategories?.every((c) => {
      if (c.enabled) return true;
      if (c.deleted) return true;
      return false;
    });
  };

  const handleSelectAllChange = async (
    event: ChangeEvent<HTMLInputElement>,
    categories?: CategoryStructure[]
  ) => {
    handleSelectAll(
      event,
      async (category) => {
        await dispatch(updateCategory(category));
      },
      categories
    );
  };

  const hasChildCategories: boolean =
    category.childCategories && category.childCategories.length > 0;

  return (
    <>
      {hasChildCategories && (
        <ChildCategoryWrapper>
          <FormControlLabelSelectAllContainer
            control={
              <Checkbox
                key={`select_all-${category.id} - ${category.name}`}
                id={`select_all - ${category.id}`}
                checked={allChildrensAreSelected(category)}
                value={allChildrensAreSelected(category)}
                onChange={(e) =>
                  handleSelectAllChange(e, category.childCategories)
                }
                color="primary"
              />
            }
            label="Select All"
          />
        </ChildCategoryWrapper>
      )}
      {!category.deleted && (
        <CategoryCheckboxFacets
          key={category.id}
          childCategories={category.childCategories}
        />
      )}
    </>
  );
};
