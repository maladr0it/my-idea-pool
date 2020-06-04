import styled, { css, CSSProperties } from "styled-components/macro";

export const FlexRow = styled.div<{ gap?: CSSProperties["margin"] }>(
  ({ gap }) => css`
    display: flex;

    & > * + * {
      margin-left: ${gap};
    }
  `,
);
