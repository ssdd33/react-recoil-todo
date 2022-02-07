import { atom, selector } from "recoil";

const defaultTodoListCards = {
  1: [{ id: 1, text: "default todo ", isChecked: false }],
};
export const todoListCards = atom({
  key: "todoListCards",
  default: defaultTodoListCards,
});

const cards = [1];
export const cardIds = atom({
  key: "cardIds",
  default: cards,
});
