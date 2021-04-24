import { FormControlLabel, IconButton } from "@material-ui/core";
import styled from "styled-components";

export const FormContainer = styled.div`
  display: flex;
`;
export const ChildCategoryWrapper = styled.div`
  // display: flex;
  padding: 0px 10px;
`;
export const ChildCategoryCheckboxWrapper = styled.div`
  padding-left: 20px !important;
  & > * .form-check-label {
    color: grey !important;
    font-weight: 600;
  }

  & > * input[type="checkbox" i] {
    filter: grayscale(1);
  }
`;

export const ChildContainer = styled.div`
  flex: 2;
`;

export const CategoryContent = styled.div`
  display: flex;
`;

export const CheckboxContainer = styled.div`
  width: 120px;
  overflow: hidden;
  white-space: nowrap !important;
  text-overflow: ellipsis !important;

  &:hover {
    overflow: visible;
    min-width: 120px;
    width: auto;
    background-color: #ececec;
    border-radius: 10px;
    padding: 2px 5px;
  }

  & > * .form-check-label {
    color: grey !important;
    font-weight: 400;
  }
  & > * .form-check {
    white-space: nowrap !important;
    text-overflow: ellipsis !important;
  }
`;

export const FormControlLabelContainer = styled(FormControlLabel)`
  width: 130px;

  & > * .MuiFormControlLabel-root {
    width: 100% !important;
  }
  & > .MuiTypography-root {
    color: grey !important;
  }
`;
export const FormControlLabelSelectAllContainer = styled(FormControlLabel)`
  width: 130px;
  & > .MuiFormControlLabel-root {
    width: 100% !important;
  }

  & > .MuiTypography-root {
    color: grey !important;
    font-weight: 600;
  }
`;

export const IconButtonContainer = styled(IconButton)`
  flex: 7 !important;
  justify-content: start !important;
`;
