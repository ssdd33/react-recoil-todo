import styled from "@emotion/styled";
import { useState, ChangeEvent } from "react";
import { useSetRecoilState } from "recoil";
import { ITodoItem, updateItem } from "../../store/TodoState";
import { Buttons } from "./Buttons";

export function TodoItem({
  cardId,
  item,
}: {
  cardId: number;
  item: ITodoItem;
}) {
  const { id, text, isComplete } = item;
  const [inputValue, setInputValue] = useState(text);
  const setItem = useSetRecoilState(updateItem({ cardId, itemId: id }));
  const onToggleCheck = () => {
    setItem({ type: "toggleCheck" });
  };
  const onTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    //inputValue 업데이트 후 한번에 text 업데이트하는 방법으로 수정
    const value = !e.target.value ? " " : e.target.value;
    setInputValue(value);
    setItem({ type: "changeText", payload: value });
  };

  const onInsert = () => {
    setItem({ type: "insert" });
  };
  const onRemove = () => {
    setItem({ type: "remove" });
  };
  return (
    <TodoItemStyle>
      <input type={"checkbox"} checked={isComplete} onChange={onToggleCheck} />
      <input type={"text"} value={inputValue} onChange={onTextChange} />
      <Buttons onInsert={onInsert} onRemove={onRemove} />
    </TodoItemStyle>
  );
}

const TodoItemStyle = styled.div``;
