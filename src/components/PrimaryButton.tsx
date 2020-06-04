import styled from "styled-components/macro";

export const PrimaryButton = styled.button`
  height: 40px;
  padding: 0 12px;
  font-size: 14px;
  border: none;
  text-transform: uppercase;
  background-color: var(--primary);
  color: var(--onPrimary);

  &:disabled {
    opacity: 0.5;
  }
`;
