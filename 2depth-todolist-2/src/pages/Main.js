import React from "react";
import { ContainerLayout } from "../layouts/ContainerLayout";
import { Filter } from "../features/cardList/Filter";
import { CardList } from "../features/cardList/CardList";

export function Main() {
  return (
    <div>
      <ContainerLayout>
        <Filter cardId={0} />
        <CardList />
      </ContainerLayout>
    </div>
  );
}
