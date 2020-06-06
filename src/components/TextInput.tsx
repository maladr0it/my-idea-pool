import styled from "styled-components/macro";

export const TextInput = styled.input`
  padding-bottom: 4px;
  min-width: 0;
  height: 36px;
  padding: 0;
  font-size: 16px;
  border: none;
  background-color: transparent;
  border-bottom: 1px solid rgba(42, 56, 66, 0.5);
  appearance: none;

  &:disabled {
    opacity: 0.5;
  }
`;
