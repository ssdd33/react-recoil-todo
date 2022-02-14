import { useState } from "react";
import { useSetRecoilState } from "recoil";
import { todoState } from "../../../store/TodoState";

export function TodoItem({ item, cardId }) {
  const [inputValue, setInputValue] = useState(item.text);
  const updateTodoState = useSetRecoilState(todoState);

  const toggleCheckBox = () => {
    updateTodoState("toggleCheck", {
      itemId: item.id,
      cardId: cardId,
      text: null,
    });
  };
  const handleOnChangeInput = (e) => {
    setInputValue(e.target.value);
  };
  const handleOnInsertItem = () => {
    updateTodoState("insert", { itemId: item.id, cardId: cardId, text: null });
  };
  const handleOnRemoveItem = () => {
    updateTodoState("remove", { itemId: item.id, cardId: cardId, text: null });
  };

  return (
    <div>
      <input
        type="checkbox"
        value={item.isComplete}
        onChange={toggleCheckBox}
      />
      <input
        type="text"
        value={inputValue}
        onChange={handleOnChangeInput}
        onBlur={() =>
          updateTodoState("changeText", {
            itemId: item.id,
            cardId: cardId,
            text: inputValue,
          })
        }
      />
      <button onClick={handleOnInsertItem}>insert</button>
      <button onClick={handleOnRemoveItem}>remove</button>
    </div>
  );
}
