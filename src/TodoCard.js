import { useRecoilState } from "recoil";
import { todoList } from "./state";
import TodoItem from "./TodoItem";

function TodoCard({ id }) {
  const [todolist, setTodolist] = useRecoilState(todoList);
  const addTopItem = () => {
    /*
      1.add item {id:,text:'',isChecked:false,cardId:id}
      2.add itemIds ?
      */
  };
  const insertItem = () => {};
  const removeItem = () => {};
  const onCheckItem = (id) => {};
  const onChangeItemText = (e) => {
    /**/
  };

  return (
    <div style={{ border: "1px solid gray", width: "100%", padding: "10px" }}>
      <select style={{ marginRight: "10px" }}>
        <option>all</option>
        <option>complete</option>
        <option>incomplete</option>
      </select>
      <button onClick={addTopItem}>add on top</button>
      <li style={{ listStyle: "none" }}>
        {todolist.map((item) => (
          <div
            style={{
              display: "flex",
              displayDirection: "row",
            }}
          >
            <input
              type={"checkbox"}
              onChange={() => onCheckItem(item.id)}
              checked={item.isChecked}
            />
            <TodoItem
              key={item.id.toString()}
              onChange={() => onChangeItemText(item.id)}
              text={item.text}
            />
            <button
              onClick={() => insertItem(item.id)}
              style={{
                height: "20px",
                marginRight: "5px",
                width: "fit-content",
              }}
            >
              insert below
            </button>
            <button
              onClick={() => removeItem(item.id)}
              style={{ height: "20px" }}
            >
              remove
            </button>
          </div>
        ))}
      </li>
    </div>
  );
}

export default TodoCard;
