import React from "react";

import * as ideasService from "../../services/ideas";
import { useService } from "../../useService";

import { useIdeasContext, getIdea } from "./IdeasContext";
import { IdeaForm, FormValues } from "./IdeaForm";

interface Props {
  id: string;
  row: number;
}

export const EditIdeaForm = ({ id, row }: Props) => {
  const [state, dispatch] = useIdeasContext();
  const idea = getIdea(state, id);

  const service = useService(async (values: FormValues) => {
    const idea = await ideasService.updateIdea(
      id,
      values.content,
      values.impact,
      values.ease,
      values.confidence,
    );
    dispatch({ type: "idea_updated", idea });
  });

  const cancelEdit = () => {
    dispatch({ type: "editing_cancelled" });
  };

  return (
    <IdeaForm
      id={id}
      row={row}
      {...idea}
      submitting={service.loading}
      onSubmit={service.call}
      onCancel={cancelEdit}
    />
  );
};
