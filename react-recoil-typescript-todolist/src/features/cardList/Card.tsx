import styled from "@emotion/styled";
import { useRecoilState } from "recoil";
import { updateCard } from "../../store/TodoState";
import { Buttons } from "./Buttons";
import { Filter } from "./Filter";
import { TodoList } from "./TodoList";

export function Card({ cardId }: { cardId: number }) {
  const [nextId, setCard] = useRecoilState(updateCard(cardId));
  //add card : setCard(nextId)
  //remove card : setCard(0)

  const onInsert = () => {
    const nextid = nextId;
    setCard(nextid);
  };
  const onRemove = () => setCard(0);
  return (
    <CardStyle>
      <TodoListWrap>
        <Filter cardId={cardId} />
        <TodoList cardId={cardId} />
      </TodoListWrap>
      <Buttons onInsert={onInsert} onRemove={onRemove} />
    </CardStyle>
  );
}

const CardStyle = styled.div``;
const TodoListWrap = styled.div`
  border: 1px solid gray;
  padding: 10px;
`;
