import styled from "@emotion/styled";
import { ReactNode } from "react";

export function ContainerLayout({ children }: { children: ReactNode }) {
  return <ContainerLayoutStyled>{children}</ContainerLayoutStyled>;
}

const ContainerLayoutStyled = styled.div``;
