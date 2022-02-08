import { useSetRecoilState } from "recoil";
import { todoState } from "../../store/TodoState";

export function Filter({ cardId }) {
  const setFilter = useSetRecoilState(todoState);
  const onChange = (e) => {
    setFilter(cardId, e.target.value);
  };
  return (
    <div>
      <select onChange={onChange}>
        <option value={"all"}>all</option>
        <option value={"complete"}>complete</option>
        <option value={"uncomplete"}>uncomplete</option>
      </select>
    </div>
  );
}
