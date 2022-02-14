import styled from "@emotion/styled";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { AddTodoItem } from "../../components/AddTodoItem";
import { todoList, todoState } from "../../store/TodoState";
import { TodoItem } from "./TodoItem";
const randomKey = (id: number) => {
  return ` ${Math.ceil(Math.random() * 1000)}`;
};
export function TodoList({ cardId }: { cardId: number }) {
  const list = useRecoilValue(todoList(cardId));
  const setTodoState = useSetRecoilState(todoState);
  const onAddItem = () => {
    setTodoState((prevState) =>
      prevState.map((card) =>
        card.cardId === cardId
          ? { ...card, todoList: [{ id: 1, text: "", isComplete: false }] }
          : card
      )
    );
  };
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
