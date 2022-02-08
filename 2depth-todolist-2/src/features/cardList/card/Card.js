import { useRecoilValue } from "recoil";
import { TodoList } from "./TodoList";
import { Filter } from "../Filter";
import { todoList } from "../../../store/TodoState";

export function Card({ cardId }) {
  const todolist = useRecoilValue(todoList(cardId));
  const handleOnInsertCard = () => {};
  const handleOnRemoveCard = () => {};
  return (
    <div>
      <Filter cardId={cardId} />
      <TodoList todolist={todolist} />
      <button onClick={handleOnInsertCard}>insert</button>
      <button onClick={handleOnRemoveCard}>remove</button>
    </div>
  );
}
