import styled from "@emotion/styled";
import { useRecoilValue, useRecoilState } from "recoil";
import { AddTodoItem } from "../../components/AddTodoItem";
import { todoList, todoState } from "../../store/TodoState";
import { TodoItem } from "./TodoItem";
const randomKey = (id: number) => {
  return ` ${Math.ceil(Math.random() * 1000)}`;
};
export function TodoList({ cardId }: { cardId: number }) {
  const list = useRecoilValue(todoList(cardId));
  const [todostate, setTodoState] = useRecoilState(todoState);
  const onAddItem = () => {
    setTodoState((prevState) =>
      prevState.map((card) =>
        card.cardId === cardId
          ? { ...card, todoList: [{ id: 1, text: "", isComplete: false }] }
          : card
      )
    );
  };
  console.log(todostate);
  return (
    <TodoListStyle>
      {list.length ? (
        list.map((item) => {
          const key = randomKey(item.id);
          return <TodoItem key={key} cardId={cardId} item={item} />;
        })
      ) : (
        <AddTodoItem onAddItem={onAddItem} />
      )}
    </TodoListStyle>
  );
}

const TodoListStyle = styled.div``;
