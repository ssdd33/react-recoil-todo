import styled from "@emotion/styled";
import { Card } from "./Card";
import { useRecoilValue } from "recoil";
import { cardIds } from "../../store/TodoState";

export function CardList() {
  const cards = useRecoilValue(cardIds);
  return (
    <CardListStyle>
      {cards.map((card) => (
        <CardWrap key={card}>
          <Card cardId={card} />
        </CardWrap>
      ))}
    </CardListStyle>
  );
}

const CardListStyle = styled.div``;
const CardWrap = styled.div``;
