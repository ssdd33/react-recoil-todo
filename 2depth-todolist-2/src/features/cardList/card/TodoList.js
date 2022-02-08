import { TodoItem } from "./TodoItem";

export function TodoList({ todolist }) {
  return (
    <div>
      {todolist.map((item) => (
        <TodoItem key={item.id} item={item} />
      ))}
    </div>
  );
}
