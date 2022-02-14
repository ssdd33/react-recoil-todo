import { useRecoilValue, useSetRecoilState } from "recoil";
import { TodoList } from "./TodoList";
import { Filter } from "../Filter";
import { todoList, todoState } from "../../../store/TodoState";

export function Card({ cardId }) {
  const todolist = useRecoilValue(todoList(cardId));
  const updateTodoState = useSetRecoilState(todoState);

  const handleOnInsertCard = () => {
    updateTodoState("insert", cardId);
  };
  const handleOnRemoveCard = () => {
    updateTodoState("remove", cardId);
  };
  return (
    <div>
      <Filter cardId={cardId} />
      <TodoList todolist={todolist} cardId={cardId} />
      <button onClick={handleOnInsertCard}>insert</button>
      <button onClick={handleOnRemoveCard}>remove</button>
    </div>
  );
}
