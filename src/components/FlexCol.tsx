import styled, { css, CSSProperties } from "styled-components/macro";

export const FlexCol = styled.div<{ gap?: CSSProperties["margin"] }>(
  ({ gap }) => css`
    display: flex;
    flex-direction: column;

    & > * + * {
      margin-top: ${gap};
    }
  `,
);
