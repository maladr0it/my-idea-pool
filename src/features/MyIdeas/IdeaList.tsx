import React from "react";
import styled from "styled-components/macro";

import { useIdeasContext } from "./IdeasContext";
import { BaseCell } from "./BaseCell";
import { AddIdeaForm } from "./AddIdeaForm";
import { IdeaItem } from "./IdeaItem";
import { EditIdeaForm } from "./EditIdeaForm";

const Table = styled.div.attrs({ role: "table" })`
  display: grid;
  grid-template-columns: 1fr 96px 96px 96px 96px 96px;
  margin-top: 24px;
`;

const ColHeader = styled(BaseCell).attrs({
  role: "columnheader",
})`
  font-size: 14px;
  text-align: center;
  height: 48px;
`;

export const IdeaList = () => {
  const [state] = useIdeasContext();

  const sortedIdeas = [...state.ideas].sort(
    (a, b) => b.average_score - a.average_score,
  );
  const addingIdea = state.status === "adding_idea";
  const startingRow = addingIdea ? 3 : 2;

  return (
    <Table>
      <ColHeader
        row={1}
        col={1}
        css={`
          visibility: hidden;
        `}
      >
        content
      </ColHeader>
      <ColHeader row={1} col={2}>
        Impact
      </ColHeader>
      <ColHeader row={1} col={3}>
        Ease
      </ColHeader>
      <ColHeader row={1} col={4}>
        Confidence
      </ColHeader>
      <ColHeader
        row={1}
        col={5}
        css={`
          font-weight: var(--fontWeight-bold);
        `}
      >
        Avg.
      </ColHeader>
      <ColHeader
        row={1}
        col={6}
        css={`
          visibility: hidden;
        `}
      >
        Controls
      </ColHeader>
      {addingIdea && <AddIdeaForm row={2} />}
      {sortedIdeas.map((idea, i) =>
        state.editingId === idea.id ? (
          <EditIdeaForm key={idea.id} id={idea.id} row={startingRow + i} />
        ) : (
          <IdeaItem key={idea.id} id={idea.id} row={startingRow + i} />
        ),
      )}
    </Table>
  );
};
