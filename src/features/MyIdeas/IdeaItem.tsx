import React, { useState } from "react";
import styled, { css } from "styled-components/macro";

import * as ideasService from "../../services/ideas";
import { IconButton } from "../../components";
import penImg from "../../assets/pen@2x.png";
import binImg from "../../assets/bin@2x.png";

import { useIdeasContext, getIdea } from "./IdeasContext";
import { BaseCell } from "./BaseCell";
import { ConfirmDialog } from "./ConfirmDialog";

const EndCell = styled(BaseCell)`
  opacity: 0;
  transition: opacity 0.2s ease-in;
  &:hover {
    opacity: 1;
  }
  &:focus-within {
    opacity: 1;
  }
`;

const Cell = styled(BaseCell)`
  /* show the end cell for this row, but not the rest */
  &:hover {
    & ~ ${EndCell} {
      opacity: 1;
      & ~ ${EndCell} {
        opacity: 0;
      }
    }
  }
`;

const ContentCell = styled(Cell)`
  justify-content: flex-start;
  font-size: 16px;
  text-align: start;
  &::before {
    content: "\\2022";
    margin-right: 12px;
    font-size: 36px;
    color: var(--neutral);
  }
`;

const Dimmer = styled.div<{ row: number }>(
  ({ row }) => css`
    grid-area: ${row} / 1 / ${row + 1} / -1;
    background-color: var(--background);
    opacity: 0.5;
    pointer-events: none;
  `,
);

interface Props {
  id: string;
  row: number;
}

export const IdeaItem = ({ id, row }: Props) => {
  const [state, dispatch] = useIdeasContext();
  const [deleting, setDeleting] = useState(false);
  const [showDialog, setShowDialog] = useState(false);

  const openDialog = () => setShowDialog(true);
  const closeDialog = () => setShowDialog(false);

  const idea = getIdea(state, id);

  const editIdea = async () => {
    dispatch({ type: "editing_started", id });
  };

  const removeIdea = async () => {
    try {
      setDeleting(true);
      await ideasService.deleteIdea(id);
      dispatch({ type: "idea_removed", id });
    } catch {
      // don't display errors, not within project scope
      setDeleting(false);
    }
  };

  return (
    <>
      <ContentCell row={row} col={1}>
        {idea.content}
      </ContentCell>
      <Cell row={row} col={2}>
        {idea.impact}
      </Cell>
      <Cell row={row} col={3}>
        {idea.ease}
      </Cell>
      <Cell row={row} col={4}>
        {idea.confidence}
      </Cell>
      <Cell row={row} col={5}>
        {idea.average_score.toFixed(1)}
      </Cell>
      <EndCell row={row} col={6}>
        <IconButton aria-label="Edit" onClick={editIdea}>
          <img src={penImg} alt="" />
        </IconButton>
        <IconButton
          aria-label="Remove"
          onClick={openDialog}
          css={`
            margin-left: 12px;
          `}
        >
          <img src={binImg} alt="" />
        </IconButton>
      </EndCell>
      {deleting && <Dimmer row={row} />}
      {showDialog && (
        <ConfirmDialog
          onConfirm={removeIdea}
          onDismiss={closeDialog}
          submitting={deleting}
        />
      )}
    </>
  );
};
