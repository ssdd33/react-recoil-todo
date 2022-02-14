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

const makeCardList = selector({
  key: "makeCardList",
  get: ({ get }) => {
    const ids = get(cardIds);
    const cardsObject = get(todoListCards);
    let list = [];
    ids.forEach((id) => list.push(cardsObject[id]));
    return list;
  },
});

export const cardList = atom({
  key: "cardList",
  default: makeCardList,
});

//1depth filter

export const rootFilterState = atom({
  key: "rootFilterState",
  default: "all",
});

// const filteringCards = selector({
//   key: "filteringCards",
//   get: ({ get }) => {
//     const cardList = get(cardList);
//     const filterState = get(rootFilterState);

//     switch (filterState) {
//       case "complete":
//         return cardList.map((todoList) =>
//           todoList.filter((item) => item.isChecked)
//         );
//       case "uncomplete":
//         return cardList.map((todoList) =>
//           todoList.filter((item) => !item.isChecked)
//         );
//       default:
//         return cardList;
//     }
//   },
// });

// export const filteredCards = atom({
//   key: "filteredCards",
//   default: filteringCards,
// });
