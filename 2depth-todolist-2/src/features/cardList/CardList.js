import { useRecoilValue } from "recoil";
import { Card } from "./card/Card";
import { cardIds } from "../../store/TodoState";

export function CardList() {
  const cards = useRecoilValue(cardIds);

  return (
    <div>
      {cards.map((id) => (
        <Card key={id} cardId={id} />
      ))}
    </div>
  );
}
