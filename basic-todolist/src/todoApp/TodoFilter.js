import { useSetRecoilState } from "recoil";
import { selectState } from "../state";
export default function TodoFilter() {
  const setSelectState = useSetRecoilState(selectState);
  const handleOnChange = (e) => {
    setSelectState(e.target.value);
  };
  return (
    <div>
      <select onChange={handleOnChange}>
        <option value={"all"}>all</option>
        <option value={"complete"}>complete</option>
        <option value={"incomplete"}>incomplete</option>
      </select>
    </div>
  );
}
