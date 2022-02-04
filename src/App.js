import { useRecoilState } from "recoil";
import { cardIds } from "./state";
import TodoCard from "./TodoCard";
function App() {
  const [cards, setCards] = useRecoilState(cardIds);
  const addTopCard = () => {
    /*
    1.update todoList : cardId++ 
    2.cardIds.push(length)
    */
  };
  const insertCard = (id) => {
    /*
    1.update todoList : cardId > id? cardId++
    2.cardIds.push(length)
    */
  };
  const removeCard = (id) => {
    /*
    1.update todoList : 
    1-1.filter cardId==id
    1-2.cardId > id ? cardId--
    2.cardIds.pop()
    */
  };

  return (
    <div style={{ padding: "10px 300px" }}>
      <select style={{ marginRight: "10px" }}>
        <option>all</option>
        <option>complete</option>
        <option>incomplete</option>
      </select>
      <button onClick={addTopCard}>add on top</button>
      <li style={{ listStyle: "none" }}>
        {cards.map((cardId) => (
          <ul
            style={{
              display: "flex",
              displayDirection: "row",
            }}
          >
            <TodoCard key={cardId.toString()} id={cardId} />
            <button
              onClick={() => insertCard(cardId)}
              style={{ height: "20px", marginRight: "5px" }}
            >
              insert below
            </button>
            <button
              onClick={() => removeCard(cardId)}
              style={{ height: "20px" }}
            >
              remove
            </button>
          </ul>
        ))}
      </li>
    </div>
  );
}

export default App;
