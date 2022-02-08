/*
-update allFilter -> update all todoState -> derive todoList
-update card filter -> update todoState by CardId -> derive todoList

-input text :update todoState by cardId, itemId
-check 

-add item: update todoState by cardId
-remove item:

-add card: update todoState, update cardState
-remove card: 

-todoList : subscribe todoState

*/

import { atom, selector, selectorFamily } from "recoil";

export const todoState = atom({
  key: "todoState",
  default: [
    {
      cardId: 1,
      filter: "all",
      todoList: [{ id: 1, text: "default todo", isComplete: false }],
    },
  ],
});

const cardState = atom({
  key: "cardState",
  default: { cardId: [1], allFilter: "all" },
});

export const cardIds = atom({
  key: "cardIds",
  default: [1],
});

export const todoList = selectorFamily({
  key: "todoList",
  get:
    (cardId) =>
    ({ get }) => {
      const todostates = get(todoState);
      const todostate = todostates.filter(
        (state) => state.cardId === cardId
      )[0];
      const todolist = todostate.todoList;

      switch (todostate.filter) {
        case "all":
          return todolist;
        case "complete":
          return todolist.filter((item) => item.isComplete);
        case "unComplete":
          return todolist.filter((item) => !item.isComplete);
        default:
          return todolist;
      }
    },
});

export const updateFilter = selectorFamily({
  key: "updateFilter",
  set:
    (cardId, option) =>
    ({ set }) => {
      set(todoState, (prevState) => {
        if (cardId > 0)
          return prevState.map((card) =>
            card.cardId === cardId ? { ...card, filter: option } : card
          );
        return prevState.map((card) => ({ ...card, filter: option }));
      });
    },
});
