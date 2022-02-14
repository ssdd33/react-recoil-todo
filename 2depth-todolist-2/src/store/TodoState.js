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
      console.log(typeof todostates);
      console.log(todostates);
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

//crud
/* todoItem
 toggleCheck, itemId,cardId | changeText, text, itemId ,cardId|  insert, itemId ,cardId|  remove, itemId ,cardId
 */
/*card
 insert cardId | remove cardId
 */

export const updateTodoItem = selectorFamily({
  key: "updateTodoItem",
  set:
    (type, payload) =>
    ({ set }) => {
      set(todoState, (prevState) => {
        const { cardId, itemId, text } = payload;
        let todoList = prevState.filter((card) => card.cardId === cardId)[0]
          .todoList;
        let newList = [];
        switch (type) {
          case "toggleCheck":
            newList = todoList.map((item) =>
              item.id === itemId
                ? { ...item, isComplete: !item.isComplete }
                : item
            );
            break;
          case "changeText":
            newList = todoList.map((item) =>
              item.id === itemId ? { ...item, text } : item
            );
            break;
          case "insert":
            todoList = todoList.map((item) =>
              item.id > itemId ? { ...item, id: item.id + 1 } : item
            );
            newList = todoList
              .slice(0, itemId)
              .concat([{ id: itemId + 1, text: "", isComplete: false }])
              .concat(todoList.slice(itemId));
            break;
          case "remove":
            newList = todoList.filter((item) => item.id !== itemId);
            newList = newList.map((item) =>
              item.id > itemId ? { ...item, id: item.id - 1 } : item
            );
            break;
          default:
            newList = todoList;
            break;
        }
        return prevState.map((card) =>
          card.cardId === cardId ? { ...card, todoList: newList } : card
        );
      });
    },
});

export const updateCard = selectorFamily({
  key: "updateCard",
  set:
    (type, cardId) =>
    ({ set }) => {
      set(todoState, (prevState) => {
        switch (type) {
          case "insert":
            let newState = prevState.map((card) =>
              card.cardId > cardId ? { ...card, cardId: card.cardId + 1 } : card
            );
            newState.push({
              cardId: cardId + 1,
              filter: "all",
              todoList: [{ id: 1, text: "", isComplete: false }],
            });
            newState.sort((a, b) => a.cardId - b.cardId);
            return newState;
          case "remove":
            return prevState.filter((card) => card.cardId !== cardId);
          default:
            return prevState;
        }
      });
    },
});
