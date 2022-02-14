import { useResetRecoilState } from "recoil";
import { todoState, cardIds } from "../store/TodoState";
export function AddCard() {
  const initState = useResetRecoilState(todoState);
  const initCardIds = useResetRecoilState(cardIds);

  const onAddNewCard = () => {
    initState();
    initCardIds();
  };
  return <button onClick={onAddNewCard}>Add new card</button>;
}
