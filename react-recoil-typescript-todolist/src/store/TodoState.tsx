import { atom, selector, selectorFamily } from "recoil";

export interface ITodoItem {
  id: number;
  text: string;
  isComplete: boolean;
}

interface ITodoCard {
  cardId: number;
  filter: string;
  todoList: ITodoItem[];
}

const todoItemTemplate = { id: 1, text: "", isComplete: false };
const todoCardTemplate = {
  cardId: 1,
  filter: "all",
  todoList: [{ id: 1, text: "", isComplete: false }],
};
const defaultTodoState = [
  {
    cardId: 1,
    filter: "all",
    todoList: [{ id: 1, text: "", isComplete: false }],
  },
];

export const todoState = atom<ITodoCard[]>({
  key: "todoState",
  default: defaultTodoState,
});

//셀렉터 패밀리의 의존성이 겹치는 경우? itemList /todoList
const itemList = selectorFamily<ITodoItem[], number>({
  key: "itemList",
  get:
    (cardId) =>
    ({ get }) => {
      const cardList = get(todoState);
      const card = cardList.filter((card) => card.cardId === cardId)[0];
      return card.todoList;
    },
});
export const todoList = selectorFamily({
  key: "todoList",
  get:
    (cardId) =>
    ({ get }) => {
      const cardList = get(todoState);
      const card = cardList.filter((card) => card.cardId === cardId)[0];
      const filter = card.filter;
      const todolist = card.todoList;

      switch (filter) {
        case "complete":
          return todolist.filter((item) => item.isComplete);
        case "uncomplete":
          return todolist.filter((item) => !item.isComplete);
        default:
          return todolist;
      }
    },
});

export const getFilterByCard = selectorFamily<string, number>({
  key: "getFilterByCard",
  get:
    (cardId) =>
    ({ get }) => {
      if (cardId > 0) {
        const cardList = get(todoState);
        const card = cardList.find(
          (card) => card.cardId === cardId
        ) as ITodoCard;
        return card.filter;
      }
      return "";
    },
});

export const filter = atom({
  key: "filter",
  default: "all",
});
//selectorFamily 무시하고 파라미터 없이 사용할 수 있는지? atom을 defaultState로 사용하면 됨
export const updateCardFilter = selectorFamily<string, number>({
  key: "updateCardFilter",
  get:
    (cardId) =>
    ({ get }) => {
      return get(filter);
    },
  set:
    (cardId) =>
    ({ set }, newValue) => {
      if (cardId === 0) {
        set(todoState, (prevState) =>
          prevState.map((card) => ({ ...card, filter: newValue.toString() }))
        );
        return;
      }
      set(todoState, (prevState) =>
        prevState.map((card) =>
          card.cardId === cardId
            ? { ...card, filter: newValue.toString() }
            : card
        )
      );
    },
});

export const cardIds = atom({
  key: "cardIds",
  default: [1],
});

export const updateCard = selectorFamily<number, number>({
  key: "updateCard",
  get:
    (cardId) =>
    ({ get }) => {
      const ids = get(cardIds);
      return ids[ids.length - 1] + 1;
    },
  set:
    (cardId) =>
    ({ set, get }, nextId) => {
      set(todoState, (prevState) => {
        if (nextId > 0) {
          const newState = prevState.map((card) =>
            card.cardId > cardId ? { ...card, cardId: card.cardId + 1 } : card
          );
          console.log("map -newState", newState);
          const newCard = Object.assign({}, todoCardTemplate);
          newCard.cardId = cardId + 1;

          newState.push(newCard);
          newState.sort((a, b) => a.cardId - b.cardId);
          console.log("sort -newState", newState);
          set(cardIds, (prevState) => prevState.concat([nextId as number]));
          console.log("cardIds", get(cardIds));
          return newState;
        }
        const Ids = get(cardIds);
        const targetIdx = Ids.indexOf(cardId);
        set(cardIds, (prevState) =>
          prevState.slice(0, targetIdx).concat(prevState.slice(targetIdx))
        );
        return prevState.filter((card) => card.cardId !== cardId);
      });
    },
});

interface IItemAction {
  type: string | null;
  payload?: string;
}

export const itemAction = atom<IItemAction>({
  key: "itemAction",
  default: { type: null, payload: undefined },
});

export const updateItem = selectorFamily<
  IItemAction,
  { cardId: number; itemId: number }
>({
  key: "updateItem",
  get:
    ({ cardId, itemId }) =>
    ({ get }) => {
      return get(itemAction);
    },
  set:
    ({ cardId, itemId }) =>
    ({ set, get }, newValue) => {
      const { type, payload } = newValue as IItemAction;
      set(todoState, (prevState) => {
        const itemlist = get(itemList(cardId));
        let newItemList: ITodoItem[];
        switch (type) {
          case "insert":
            newItemList = itemlist.map((item) =>
              item.id > itemId ? { ...item, id: item.id + 1 } : item
            );
            const newItem = Object.assign({}, todoItemTemplate);
            newItem.id = itemId + 1;
            newItemList.push(newItem);
            newItemList.sort((a, b) => a.id - b.id);
            console.log("insert", newItemList);
            break;
          case "remove":
            newItemList = itemlist.filter((item) => item.id !== itemId);
            console.log("remove");
            break;

          case "toggleCheck":
            newItemList = itemlist.map((item) =>
              item.id === itemId
                ? { ...item, isComplete: !item.isComplete }
                : item
            );
            console.log("toggleCheck");
            break;
          case "changeText":
            if (payload) {
              newItemList = itemlist.map((item) =>
                item.id === itemId ? { ...item, text: payload } : item
              );
              console.log("changeText", newItemList);
            }

            break;
        }
        return prevState.map((card) =>
          card.cardId === cardId ? { ...card, todoList: newItemList } : card
        );
      });
    },
});
/*
1. object key 
2. array idx (linked list?)
3. array object key : cardId+1, sort by cardId

update all filter 
update card filter 

add card -> 
remove card -> 

add Item  cardId itemId
remove Item cardId itemId

change item text  text
toggle item check

*/

const todoStateByCardId = {
  1: {
    filter: "all",
    nextItemId: 2,
    todoList: [{ id: 1, text: "", isComplete: false }],
  },
};

//test
export const testA = atom({
  key: "testA",
  default: "A",
});

export const testB = atom({
  key: "testB",
  default: "B",
});
export const testS = selector<string>({
  key: "testS",
  get: ({ get }) => {
    return get(testA);
  },
  set: ({ set }, newValue) => {
    set(testB, newValue);
  },
});
