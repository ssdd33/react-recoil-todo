export function AddTodoItem({ onAddItem }: { onAddItem: () => void }) {
  return <button onClick={onAddItem}>Add new Item</button>;
}
