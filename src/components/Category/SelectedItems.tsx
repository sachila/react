import { useEnabledCategories } from "../../hooks/CategoryHook";

export const SelectedItems: React.FC = () => {
  const { enableList } = useEnabledCategories();
  const enabledItemsAvailabe = enableList && enableList.length > 0;

  return (
    <div>
      {!enabledItemsAvailabe && (
        <span
          style={{ color: "grey", fontWeight: "bold" }}
          data-testid="selected-items-not-found"
        >
          Please select some items
        </span>
      )}
      {enabledItemsAvailabe && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: "10px",
          }}
          data-testid="selected-items-found"
        >
          {enableList.map((category) => (
            <div
              style={{ color: "grey", fontWeight: "bold" }}
              key={category.id}
            >
              {category.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SelectedItems;
