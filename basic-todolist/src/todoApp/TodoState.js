import { useRecoilValue } from "recoil";
import { todoState } from "../state";

export default function TodoState() {
  const { total, completed } = useRecoilValue(todoState);
  return (
    <div>
      <div>complete:{completed}</div>
      <div>total:{total}</div>
    </div>
  );
}
