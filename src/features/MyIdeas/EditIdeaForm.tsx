import React, { useState } from "react";

import * as ideasService from "../../services/ideas";

import { useIdeasContext, getIdea } from "./IdeasContext";
import { IdeaForm, FormValues } from "./IdeaForm";

interface Props {
  id: string;
  row: number;
}

export const EditIdeaForm = ({ id, row }: Props) => {
  const [state, dispatch] = useIdeasContext();
  const [submitting, setSubmitting] = useState(false);
  const idea = getIdea(state, id);

  const updateIdea = async (values: FormValues) => {
    try {
      setSubmitting(true);
      const idea = await ideasService.updateIdea(
        id,
        values.content,
        values.impact,
        values.ease,
        values.confidence,
      );
      dispatch({ type: "idea_updated", idea });
    } catch {
      // don't display errors, not within project scope
      setSubmitting(false);
    }
  };

  const cancelEdit = () => {
    dispatch({ type: "editing_cancelled" });
  };

  return (
    <IdeaForm
      id={id}
      row={row}
      {...idea}
      submitting={submitting}
      onSubmit={updateIdea}
      onCancel={cancelEdit}
    />
  );
};
