import TodoItem from "./TodoItem";
import { useRecoilValue } from "recoil";
import { filteredList } from "../state";
export default function TodoList() {
  const list = useRecoilValue(filteredList);
  return (
    <li style={{ listStyle: "none" }}>
      {list.map((item) => (
        <TodoItem key={item.id.toString()} item={item} />
      ))}
    </li>
  );
}
