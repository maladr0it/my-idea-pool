import React from "react";
import styled from "styled-components/macro";
import { PageNav } from "./PageNav";

export const Container = styled.div`
  min-height: 100%;
  display: grid;
  grid-template-columns: auto 1fr;
`;

interface Props {
  children?: React.ReactNode;
}

export const Page = ({ children }: Props) => {
  return (
    <Container>
      <PageNav />
      <main>{children}</main>
    </Container>
  );
};
