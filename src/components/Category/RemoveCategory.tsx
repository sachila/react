import { Button, Checkbox } from "@material-ui/core";
import { ChangeEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { useEnabledCategories } from "../../hooks/CategoryHook";
import { Category } from "../../models/Category";
import { updateCategory } from "../../store/actions";
import { useStateSelector } from "../../store/selector";
import { FormControlLabelContainer } from "../../styles/elements";

export const RemoveCategory: React.FC = () => {
  const { categories } = useStateSelector();
  const dispatch = useDispatch();
  const { deletedList } = useEnabledCategories();
  const deletedItemsAvailabe = deletedList && deletedList.length > 0;

  const [selectedIds, setSelectedIds] = useState<{ [key: string]: boolean }>(
    {}
  );

  const isCheckboxSelected = (category: Category) => {
    return selectedIds[category.id];
  };

  const handleOnChange = (
    event: ChangeEvent<HTMLInputElement>,
    category: Category
  ) => {
    const checked = event.target.checked;

    setSelectedIds((state) => {
      state[category.id] = checked;
      return state;
    });
  };

  const handleRestoreClick = () => {
    Object.keys(selectedIds).forEach((id) => {
      if (selectedIds[id]) {
        const category = categories.find((cat) => cat.id === id);
        if (category) {
          category.deleted = false;
          dispatch(updateCategory(category));
        }
      }
    });
  };
  return (
    <div>
      {!deletedItemsAvailabe && (
        <span
          style={{ color: "grey", fontWeight: "bold" }}
          data-testid="deleted-items-not-found"
        >
          Please remove some items
        </span>
      )}
      {deletedItemsAvailabe && (
        <>
          <Button
            color="primary"
            variant="contained"
            onClick={handleRestoreClick}
          >
            Restore
          </Button>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gap: "10px",
              paddingTop: "16px",
            }}
            data-testid="deleted-items-found"
          >
            {deletedList.map((category) => (
              <FormControlLabelContainer
                control={
                  <Checkbox
                    key={`${category.id} - ${category.name}`}
                    id={`${category.id}`}
                    checked={isCheckboxSelected(category)}
                    value={isCheckboxSelected(category)}
                    onChange={(e) => handleOnChange(e, category)}
                    color="default"
                  />
                }
                label={category.name}
                key={`${category.id} - ${category.name}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default RemoveCategory;
