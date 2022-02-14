import { useEffect } from "react";

import { useRecoilState, useRecoilValue } from "recoil";
import { testA, testB, testS } from "../store/TodoState";
export default function Test() {
  const [testGetA, testSetA] = useRecoilState(testA);
  const [testGetS, testSetS] = useRecoilState(testS);
  const [testGetB, testSetB] = useRecoilState(testB);

  console.log("setA");
  testSetA("AA");
  console.log("getA", testGetA);

  console.log("setS");
  testSetS("S");

  useEffect(() => {
    console.log(testGetB);
  }, [testGetB]);
  return <div>T</div>;
}
