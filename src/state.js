import { atom } from "recoil";

/*
item:{id,text,isChecked,cardId}
*/
const itemList = [{ id: 1, text: "test", isChecked: false, cardId: 1 }];

export const todoList = atom({
  key: "todoList",
  default: itemList,
});

const cards = [1];
export const cardIds = atom({
  key: "cardIds",
  default: cards,
});

const items = [1];
export const itemIds = atom({
  key: "itemIds",
  default: items,
});
