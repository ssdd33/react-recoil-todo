import styled from "@emotion/styled";
import { useRecoilValue, useRecoilState } from "recoil";
import { todoList } from "../../store/TodoState";
import { TodoItem } from "./TodoItem";
const randomKey = (id: number) => {
  return ` ${Math.ceil(Math.random() * 1000)}`;
};
export function TodoList({ cardId }: { cardId: number }) {
  const list = useRecoilValue(todoList(cardId));
  return (
    <TodoListStyle>
      {list.map((item) => {
        const key = randomKey(item.id);
        return <TodoItem key={key} cardId={cardId} item={item} />;
      })}
    </TodoListStyle>
  );
}

const TodoListStyle = styled.div``;
