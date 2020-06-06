import styled from "styled-components/macro";

export const SecondaryButton = styled.button`
  height: 40px;
  font-size: 16px;
  margin: 0;
  padding: 0;
  border: none;
  font-weight: var(--fontWeight-bold);
  text-transform: uppercase;
  background-color: transparent;
  color: var(--onBackground);
  cursor: pointer;

  &:disabled {
    opacity: 0.5;
  }
`;
