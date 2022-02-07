import TodoInput from "./todoApp/TodoInput";
import TodoFilter from "./todoApp/TodoFilter";
import TodoList from "./todoApp/TodoList";
import TodoState from "./todoApp/TodoState";

function App() {
  return (
    <div>
      <TodoInput />
      <TodoList />
      <TodoFilter />
      <TodoState />
    </div>
  );
}

export default App;
