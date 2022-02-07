import { useSetRecoilState } from "recoil";
import { todoList } from "../state";

export default function TodoItem({ item }) {
  const setTodoList = useSetRecoilState(todoList);
  const handleOnCheck = () => {
    setTodoList((prev) =>
      prev.map((todoItem) =>
        todoItem.id === item.id
          ? { ...todoItem, isChecked: !todoItem.isChecked }
          : todoItem
      )
    );
  };
  const handleOnRemove = () => {
    setTodoList((prev) => prev.filter((todoItem) => todoItem.id !== item.id));
  };
  return (
    <div
      style={{
        width: "200px",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <input
        type="checkbox"
        checked={item.isChecked}
        onChange={handleOnCheck}
      />
      {item.text}
      <div
        onClick={handleOnRemove}
        style={{
          width: "20px",
          height: "20px",
          borderRadius: "50%",
          backgroundColor: "gray",
          color: "white",
          textAlign: "center",
        }}
      >
        X
      </div>
    </div>
  );
}
