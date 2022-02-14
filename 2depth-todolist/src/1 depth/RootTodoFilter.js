import { useSetRecoilState } from "recoil";
import { rootFilterState } from "../state";
export default function RootTodoFilter() {
  const setState = useSetRecoilState(rootFilterState);
  const handleOnChange = (e) => {
    setState(e.target.value);
  };
  return (
    <div>
      <select onChange={handleOnChange}>
        <option value={"all"}>all</option>
        <option value={"complete"}>complete</option>
        <option value={"uncomplete"}>uncomplete</option>
      </select>
    </div>
  );
}
