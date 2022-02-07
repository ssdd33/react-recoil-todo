import { useSetRecoilState } from "recoil";
import { todoListCards } from "../state";
import TodoFilter from "./TodoFilter";
import TodoItem from "./TodoItem";
export default function TodoList({ todolist, cardId }) {
  const setCards = useSetRecoilState(todoListCards);

  const handleOnItemInsert = (id) => {
    setCards((prev) => {
      const newCards = Object.assign({}, prev);
      const listByCardId = newCards[cardId].slice();
      listByCardId.map((item) =>
        item.id > id ? { ...item, id: item.id + 1 } : item
      );
      const newId = id + 1;
      listByCardId.push({ id: newId, text: " ", isChecked: false });
      listByCardId.sort((a, b) => a.id - b.id);
      newCards[cardId] = listByCardId;
      return newCards;
    });
  };
  const handleOnItemRemove = (id) => {
    setCards((prev) => {
      const newCards = Object.assign({}, prev);
      const listByCardId = newCards[cardId];
      newCards[cardId] = listByCardId.filter((item) => item.id !== id);
      return newCards;
    });
  };
  const handleOnCheck = (id) => {
    setCards((prev) => {
      const newCards = Object.assign({}, prev);
      const listByCardId = newCards[cardId];
      newCards[id] = listByCardId.map((item) =>
        item.id === id ? { ...item, isChecked: !item.isChecked } : item
      );
    });
  };
  const handleOnChangeText = (id, newText) => {
    setCards((prev) => {
      const newCards = Object.assign({}, prev);
      const listByCardId = newCards[cardId];
      listByCardId.map((item) =>
        item.id === id ? { ...item, text: newText } : item
      );
      return newCards;
    });
  };
  return (
    <div style={{ border: "1px solid gray" }}>
      <TodoFilter />
      <li>
        {todolist.map((item) => (
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
