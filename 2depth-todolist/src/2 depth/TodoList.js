import { useState, useEffect } from "react";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { todoListCards, rootFilterState } from "../state";
import TodoFilter from "./TodoFilter";
import TodoItem from "./TodoItem";
export default function TodoList({ todolist, cardId }) {
  const setCards = useSetRecoilState(todoListCards);
  const [itemList, setItemList] = useState(todolist);
  const rootFilter = useRecoilValue(rootFilterState);
  const handleOnSelectChange = (value) => {
    switch (value) {
      case "complete":
        setItemList(todolist.filter((item) => item.isChecked));
        break;
      case "uncomplete":
        setItemList(todolist.filter((item) => !item.isChecked));
        break;
      case "all":
        setItemList(todolist);
        break;
    }
  };
  useEffect(() => {
    handleOnSelectChange(rootFilter);
  }, [rootFilter]);
  const handleOnItemInsert = (id) => {
    setCards((prev) => {
      const newCards = Object.assign({}, prev);
      const listByCardId = newCards[cardId].map((item) =>
        item.id > id ? { ...item, id: item.id + 1 } : item
      );
      const newId = id + 1;
      listByCardId.push({ id: newId, text: " ", isChecked: false });
      listByCardId.sort((a, b) => a.id - b.id);
      newCards[cardId] = listByCardId;
      console.log(newCards);
      return newCards;
    });
  };
  const handleOnItemRemove = (id) => {
    setCards((prev) => {
      const newCards = Object.assign({}, prev);
      newCards[cardId] = newCards[cardId].filter((item) => item.id !== id);
      return newCards;
    });
  };
  const handleOnCheck = (id) => {
    setCards((prev) => {
      const newCards = Object.assign({}, prev);
      newCards[cardId] = newCards[cardId].map((item) =>
        item.id === id ? { ...item, isChecked: !item.isChecked } : item
      );
      return newCards;
    });
  };
  const handleOnChangeText = (id, newText) => {
    setCards((prev) => {
      const newCards = Object.assign({}, prev);
      newCards[cardId] = newCards[cardId].map((item) =>
        item.id === id ? { ...item, text: newText } : item
      );
      return newCards;
    });
  };
  console.log(itemList);
  return (
    <div style={{ border: "1px solid gray" }}>
      <TodoFilter onChange={handleOnSelectChange} />
      <li>
        {itemList.map((item) => (
          <ul key={item.id}>
            <TodoItem
              item={item}
              handleOnCheck={handleOnCheck}
              handleOnChangeText={handleOnChangeText}
            />
            <button onClick={() => handleOnItemInsert(item.id)}>insert</button>
            <button onClick={() => handleOnItemRemove(item.id)}>remove</button>
          </ul>
        ))}
      </li>
    </div>
  );
}
