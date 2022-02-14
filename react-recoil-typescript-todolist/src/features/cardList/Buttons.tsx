import styled from "@emotion/styled";

interface IButtonsProps {
  onInsert: () => void;
  onRemove: () => void;
}
export function Buttons({ onInsert, onRemove }: IButtonsProps) {
  return (
    <ButtonsStyled>
      <InsertButton onClick={onInsert}>insert</InsertButton>
      <RemoveButton onClick={onRemove}>remove</RemoveButton>
    </ButtonsStyled>
  );
}

const ButtonsStyled = styled.div`
  padding: 10px;
`;
const InsertButton = styled.button``;
const RemoveButton = styled.button``;
