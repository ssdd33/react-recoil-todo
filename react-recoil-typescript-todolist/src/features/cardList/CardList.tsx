import styled from "@emotion/styled";
import { Card } from "./Card";
import { useRecoilValue } from "recoil";
import { cardIds } from "../../store/TodoState";
import { AddCard } from "../../components/AddCard";

export function CardList() {
  const cards = useRecoilValue(cardIds);
  console.log(cards);
  return (
    <CardListStyle>
      {cards.length ? (
        cards.map((card) => (
          <CardWrap key={card}>
            <Card cardId={card} />
          </CardWrap>
        ))
      ) : (
        <AddCard />
      )}
    </CardListStyle>
  );
}

const CardListStyle = styled.div``;
const CardWrap = styled.div``;
