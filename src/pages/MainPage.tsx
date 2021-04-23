import React, { useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import { CategoryCheckboxFacets } from "../components/Category/CategoryCheckboxFacets";
import { CategoryDetails } from "../components/CategoryDetails";
import { responseData } from "../data-files/responst";
import {
  useBuildedCategoryData,
  useCategoryDataStructure,
} from "../hooks/CategoryHook";
import { CategoryStructure } from "../models/CategoryStructure";
import {
  loadCategoryStructuredData,
  loadCategoryApiData,
} from "../store/actions";
import { FormContainer } from "../styles/elements";

export const MainPage: React.FC = () => {
  const dispatch = useDispatch();
  const { rootCategories, childCategories } = useCategoryDataStructure();
  // holds the builted tree structured data
  const categories: CategoryStructure[] = useBuildedCategoryData();

  // build the stuctured category data and save it in the state
  useMemo(() => {
    dispatch(
      loadCategoryStructuredData(rootCategories.concat(childCategories))
    ); // eslint-disable-next-line
  }, [rootCategories.length]);

  // load the api data from response.ts file
  useEffect(() => {
    dispatch(loadCategoryApiData(responseData.data.categories)); // eslint-disable-next-line
  }, [responseData.data.categories]);

  return (
    <FormContainer>
      <CategoryCheckboxFacets childCategories={categories} />
      <CategoryDetails />
    </FormContainer>
  );
};
