import { useRecoilState } from "recoil";
import { todoListCards, cardIds } from "../state";
import TodoList from "../2 depth/TodoList";
import RootTodoFilter from "./RootTodoFilter";

export default function TodoCardList() {
  const [cards, setCards] = useRecoilState(todoListCards);
  const [ids, setIds] = useRecoilState(cardIds);

  const handleOnInsert = (id) => {
    const newCards = Object.assign({}, cards);
    ids.forEach((cardId) => {
      if (cardId > id) newCards[cardId + 1] = cards[cardId];
    });
    newCards[id + 1] = [{ id: 1, text: "", isChecked: false }];
    setCards(newCards);
    setIds([...ids, ids.length + 1]);
    console.log(cards);
  };
  const handleOnRemove = (id) => {
    const newCards = Object.assign({}, cards);
    delete newCards[id];
    setCards(newCards);
    setIds((prev) => prev.filter((cardId) => cardId !== id));
  };
  return (
    <div>
      <RootTodoFilter />
      <li>
        {ids.map((id) => (
          <ul key={id}>
            <TodoList todolist={cards[id]} cardId={id} />
            <button onClick={() => handleOnInsert(id)}>insert</button>
            <button onClick={() => handleOnRemove(id)}>remove</button>
          </ul>
        ))}
      </li>
    </div>
  );
}
