import { CategoryStructure } from "../../models/CategoryStructure";
import React, { ChangeEvent } from "react";
import { useDispatch } from "react-redux";
import { updateCategory } from "../../store/actions";
import {
  ChildCategoryWrapper,
  ChildContainer,
  FormControlLabelContainer,
  IconButtonContainer,
} from "../../styles/elements";
import {
  handleDeleteAll,
  handleSelectAll,
} from "../../services/CategoryService";
import { CategoryChildCheckboxFacets } from "./CategoryChildCheckboxFacets";
import { Checkbox, FormGroup } from "@material-ui/core";
import ClearIcon from "@material-ui/icons/Clear";

interface Props {
  childCategories: CategoryStructure[];
}

export const CategoryCheckboxFacets: React.FC<Props> = (props) => {
  const { childCategories } = props;
  const dispatch = useDispatch();

  const handleCheckboxChange = async (
    event: ChangeEvent<HTMLInputElement>,
    category: CategoryStructure
  ) => {
    if (category.deleted) return;
    const checked = event.target.checked;
    category.enabled = checked;

    await dispatch(updateCategory(category));

    handleSelectAll(
      event,
      async (category) => {
        await dispatch(updateCategory(category));
      },
      category.childCategories
    );
  };

  const handleClickDelete = async (category: CategoryStructure) => {
    category.deleted = true;
    category.enabled = false;

    await dispatch(updateCategory(category));

    handleDeleteAll(
      category.deleted,
      category.enabled,
      async (category) => {
        await dispatch(updateCategory(category));
      },
      category.childCategories
    );
  };

  return (
    <ChildContainer>
      <FormGroup>
        {childCategories.map((category) => (
          <ChildCategoryWrapper key={`${category.id} - ${category.name}`}>
            {!category.deleted && (
              <>
                <FormControlLabelContainer
                  control={
                    <Checkbox
                      key={`${category.id} - ${category.name}`}
                      id={category.id}
                      checked={category.enabled}
                      value={category.enabled}
                      onChange={(e) => handleCheckboxChange(e, category)}
                      color="default"
                    />
                  }
                  label={category.name}
                />
                <IconButtonContainer
                  aria-label="delete"
                  onClick={(e) => handleClickDelete(category)}
                >
                  <ClearIcon />
                </IconButtonContainer>
                <CategoryChildCheckboxFacets category={category} />{" "}
              </>
            )}
          </ChildCategoryWrapper>
        ))}
      </FormGroup>
    </ChildContainer>
  );
};
