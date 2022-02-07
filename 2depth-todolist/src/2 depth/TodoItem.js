import { useState } from "react";

export default function TodoItem({ item, handleOnCheck, handleOnChangeText }) {
  const [inputValue, setInputValue] = useState(item.text);
  const onChange = (e) => {
    setInputValue(e.target.value);
  };
  return (
    <div>
      <input
        type={"checkbox"}
        checked={item.isChecked}
        onChange={() => handleOnCheck(item.id)}
      />
      <input
        type={"text"}
        value={inputValue}
        onChange={onChange}
        onKeyUp={() => handleOnChangeText(item.id, inputValue)}
      />
    </div>
  );
}
