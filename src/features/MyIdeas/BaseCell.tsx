import styled, { css } from "styled-components/macro";

export const BaseCell = styled.div.attrs<{ row: number; col: number }>(
  ({ row, col }) => ({
    role: "cell",
    "aria-rowindex": row,
    "aria-colindex": col,
  }),
)<{ row: number; col: number }>(
  ({ row, col }) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 48px;
    grid-area: ${row} / ${col} / ${row + 1} / ${col + 1};
    font-size: 14px;
  `,
);
