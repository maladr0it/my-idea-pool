import styled from "styled-components/macro";

export const IconButton = styled.button`
  width: 24px;
  height: 24px;
  margin: 0;
  padding: 0;
  border: none;
  background-color: transparent;
  cursor: pointer;

  &:disabled {
    opacity: 0.5;
  }

  & > img {
    display: block;
    height: 100%;
    width: 100%;
    object-fit: contain;
  }
`;
