import { useState } from "react";

export function TodoItem({ item }) {
  const [inputValue, setInputValue] = useState(item.text);
  const toggleCheckBox = () => {};
  const handleOnChangeInput = (e) => {};
  const handleOnInsertItem = () => {};
  const handleOnRemoveItem = () => {};
  return (
    <div>
      <input
        type="checkbox"
        value={item.isComplete}
        onChange={toggleCheckBox}
      />
      <input type="text" value={inputValue} onChange={handleOnChangeInput} />
      <button onClick={handleOnInsertItem}>insert</button>
      <button onClick={handleOnRemoveItem}>remove</button>
    </div>
  );
}
