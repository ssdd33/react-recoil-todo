import { atom, selector } from "recoil";

const defaultTodoList = [];

export const todoList = atom({
  key: "todoList",
  default: defaultTodoList,
});

export const selectState = atom({
  key: "selectState",
  default: "all",
});

const updateListByFilter = selector({
  key: "updateByFilter",
  get: ({ get }) => {
    const list = get(todoList);
    const filter = get(selectState);

    switch (filter) {
      case "complete":
        return list.filter((item) => item.isChecked);

      case "incomplete":
        return list.filter((item) => !item.isChecked);

      default:
        return list;
    }
  },
});

export const filteredList = atom({
  key: "filteredList",
  default: updateListByFilter,
});

export const todoState = selector({
  key: "todoState",
  get: ({ get }) => {
    const list = get(todoList);
    const total = list.length;
    const completed = list.filter((item) => item.isChecked).length;
    return { total, completed };
  },
});
