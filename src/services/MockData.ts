import { Category } from "../models/Category";
import { CategoryStructure } from "../models/CategoryStructure";

export const catogories: CategoryStructure[] = [
  {
    id: "1",
    count: 137,
    parent: "0",
    name: "parent",
    enabled: true,
    childCategories: [
      {
        id: "2",
        count: 137,
        parent: "1",
        name: "child",
        enabled: false,
      },
      {
        id: "5",
        count: 137,
        parent: "1",
        name: "child5",
        enabled: false,
      },
    ],
  },
  {
    id: "3",
    count: 137,
    parent: "0",
    name: "parent",
    enabled: false,
  },
  {
    id: "4",
    count: 137,
    parent: "0",
    name: "test",
    enabled: false,
    deleted: true,
  },
];

export const catogoryApis: Category[] = [
  {
    id: "1",
    count: 137,
    parent: "0",
    name: "Kleding",
  },
  {
    id: "2",
    count: 137,
    parent: "1",
    name: "Kleding",
  },
];
