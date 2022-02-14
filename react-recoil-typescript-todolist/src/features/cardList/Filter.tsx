import styled from "@emotion/styled";
import { useState, ChangeEvent } from "react";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { updateCardFilter, getFilterByCard } from "../../store/TodoState";
interface IFilterProps {
  cardId: number;
}
export function Filter({ cardId }: IFilterProps) {
  const currentFilter = useRecoilValue(getFilterByCard(cardId));
  const setFilter = useSetRecoilState(updateCardFilter(cardId));
  const onChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setFilter(e.target.value);
  };
  console.log("currentFilter", cardId, currentFilter);
  //selected 속성 사용하지 않고, value 사용해서 전체 필터 업데이트 하는 방법?
  return (
    <FilterStyled>
      <Select onChange={onChange}>
        <Option value={"all"} selected={currentFilter === "all"}>
          all
        </Option>
        <Option value={"complete"} selected={currentFilter === "complete"}>
          complete
        </Option>
        <Option value={"uncomplete"} selected={currentFilter === "uncomplete"}>
          uncomplete
        </Option>
      </Select>
    </FilterStyled>
  );
}

const FilterStyled = styled.div`
  margin-bottom: 10px;
`;
const Select = styled.select``;
const Option = styled.option``;
