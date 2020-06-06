import React from "react";
import styled from "styled-components/macro";

import { FlexCol } from "../../components";
import bulbImg from "../../assets/bulb@2x.png";

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
  const startingRow = state.addingIdea ? 3 : 2;

  if (!state.ideas.length && !state.addingIdea) {
    return (
      <FlexCol
        gap="12px"
        css={`
          margin-top: 144px;
          align-items: center;
          font-size: 20px;
        `}
      >
        <img
          src={bulbImg}
          alt=""
          css={`
            width: 64px;
          `}
        />
        <div>Got ideas?</div>
      </FlexCol>
    );
  }

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
      {state.addingIdea && <AddIdeaForm row={2} />}
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
