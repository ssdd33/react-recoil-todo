import { useState } from "react";
import { useSetRecoilState } from "recoil";
import { todoList } from "../state";

export default function TodoInput() {
  const [inputValue, setInputValue] = useState("");
  const setTodoList = useSetRecoilState(todoList);
  const handleOnSubmit = (e) => {
    e.preventDefault();
    setTodoList((prev) => [
      ...prev,
      { id: prev.length + 1, text: inputValue, isChecked: false },
    ]);
    setInputValue("");
  };
  return (
    <form onSubmit={handleOnSubmit}>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
    </form>
  );
}
