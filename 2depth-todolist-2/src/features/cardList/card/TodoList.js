import { TodoItem } from "./TodoItem";

export function TodoList({ todolist, cardId }) {
  return (
    <div>
      {todolist.map((item) => (
        <TodoItem key={item.id} item={item} cardId={cardId} />
      ))}
    </div>
  );
}
