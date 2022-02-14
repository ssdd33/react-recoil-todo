import styled from "@emotion/styled";
import { ContainerLayout } from "../layouts/ContainerLayout";
import { CardList } from "../features/cardList/CardList";
import { Filter } from "../features/cardList/Filter";

export function Main() {
  return (
    <MainStyled>
      <ContainerLayout>
        <Filter cardId={0} />
        <CardList />
      </ContainerLayout>
    </MainStyled>
  );
}

const MainStyled = styled.div``;
