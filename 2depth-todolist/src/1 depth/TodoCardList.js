import { useRecoilState, useRecoilValue } from "recoil";
import { todoListCards, cardIds, cardList } from "../state";
import TodoList from "../2 depth/TodoList";
import RootTodoFilter from "./RootTodoFilter";
const randomId = () => Math.ceil(Math.random() * 100000);

export default function TodoCardList() {
  const [cards, setCards] = useRecoilState(todoListCards);
  const [ids, setIds] = useRecoilState(cardIds);
  const cardlist = useRecoilValue(cardList);

  const handleOnInsert = (id) => {
    const newCards = Object.assign({}, cards);
    ids.forEach((cardId) => {
      if (cardId > id) newCards[cardId + 1] = cards[cardId];
    });
    newCards[id + 1] = [{ id: 1, text: "", isChecked: false }];
    setCards(newCards);
    setIds([...ids, ids.length + 1]);
    console.log(cards);
    console.log(ids);
  };
  const handleOnRemove = (id) => {
    const newCards = Object.assign({}, cards);
    delete newCards[id];
    setCards(newCards);
    setIds((prev) => prev.filter((cardId) => cardId !== id));
  };
  console.log(cardlist);
  return (
    <div>
      <RootTodoFilter />
      <li>
        {cardlist.map((card, idx) => (
          <ul key={randomId()}>
            <TodoList todolist={card} cardId={ids[idx]} />
            <button onClick={() => handleOnInsert(ids[idx])}>insert</button>
            <button onClick={() => handleOnRemove(ids[idx])}>remove</button>
          </ul>
        ))}
      </li>
    </div>
  );
}
