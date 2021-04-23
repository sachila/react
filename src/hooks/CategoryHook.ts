import { useMemo } from "react";
import { Category } from "../models/Category";
import { CategoryStructure } from "../models/CategoryStructure";
import { useStateSelector } from "../store/selector";

export const useCategoryDataStructure = () => {
  const { categoriesApiData } = useStateSelector();

  // This support multiple root elements
  return useMemo(() => {
    const rootCategories: CategoryStructure[] = [];
    const childCategories: CategoryStructure[] = [];
    categoriesApiData.forEach((category) => {
      if (!category.parent || category.parent === "0") {
        // these are the top level categories
        rootCategories.push({
          ...category,
          childCategories: [],
          enabled: false,
          deleted: false,
        });
      } else if (category.parent && category.parent !== "0") {
        childCategories.push({
          ...category,
          enabled: false,
          deleted: false,
        });
      }
    });

    return { childCategories, rootCategories };
  }, [categoriesApiData]);
};

export const useBuildedCategoryData = (): CategoryStructure[] => {
  const { rootCategories, childCategories } = useCategoryDataStructure();
  const { categories } = useStateSelector();

  // map the categories in hirachical order based on the parent-child relationship
  const setTreeStructure = (
    rootItems: CategoryStructure[]
  ): CategoryStructure[] => {
    if (!rootItems.length) return rootItems;

    rootItems.forEach((root) => {
      const childItems = childCategories.filter(
        (cat: Category) => cat.parent === root.id
      );
      // could have multiple subcategories for one parent
      if (childItems && childItems.length) {
        childItems.forEach((child) => {
          if (!root.childCategories) root.childCategories = [];
          root.childCategories.push({
            ...child,
            childCategories: [],
          });

          const index = childCategories.indexOf(child);
          // make sure to remove subcategories once we added them to root object
          childCategories.splice(index, 1);
        });
      }
      return setTreeStructure(root.childCategories || []);
    });
    return rootItems;
  }; // eslint-disable-next-line
  return useMemo(() => setTreeStructure(rootCategories), [
    rootCategories,
    categories,
  ]);
};

export const useEnabledCategories = (): {
  enableList: Category[];
  deletedList: Category[];
} => {
  const { categories } = useStateSelector();

  const enabledCategories: { [key: string]: Category } = {};
  const deletedCategories: { [key: string]: Category } = {};
  const checkCategories = (rootItems: CategoryStructure[]) => {
    if (!rootItems.length) return null;

    rootItems.forEach((root) => {
      if (root.enabled) {
        enabledCategories[root.id] = {
          id: root.id,
          name: root.name,
          deleted: root.deleted,
          enabled: root.enabled,
          count: root.count,
          parent: root.parent,
        };
      }
      if (root.deleted) {
        deletedCategories[root.id] = {
          id: root.id,
          name: root.name,
          deleted: root.deleted,
          enabled: root.enabled,
          count: root.count,
          parent: root.parent,
        };
      }

      checkCategories(root.childCategories || []);
    });
  };
  checkCategories(categories);

  const enableList: Category[] = Object.values(enabledCategories);
  const deletedList: Category[] = Object.values(deletedCategories);

  return { enableList, deletedList };
};

// export const useUpdateCategoryStatus = () => {
//   const { categories } = useStateSelector();

//   const updateStatus = (ids: string[], enabled: boolean, deleted: boolean) => {
//     const checkCategories = (rootItems: CategoryStructure[]) => {
//       if (!rootItems.length) return null;

//       rootItems.forEach((root) => {
//         if (ids.includes(root.id)) {
//           root.enabled = enabled;
//           root.deleted = deleted;
//         }

//         checkCategories(root.childCategories || []);
//       });
//     };
//     checkCategories(categories);
//   };

//   return { updateStatus };
// };
