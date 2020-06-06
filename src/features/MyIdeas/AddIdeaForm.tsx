import React, { useState } from "react";

import * as ideasService from "../../services/ideas";

import { IdeaForm, FormValues } from "./IdeaForm";
import { useIdeasContext } from "./IdeasContext";

const FORM_ID = "new-idea-form";

const DEFAULT_IDEA_VALUES = {
  content: "",
  impact: 5,
  ease: 5,
  confidence: 5,
};

interface Props {
  row: number;
}

export const AddIdeaForm = ({ row }: Props) => {
  const [, dispatch] = useIdeasContext();
  const [submitting, setSubmitting] = useState(false);

  const addIdea = async (values: FormValues) => {
    try {
      setSubmitting(true);
      const idea = await ideasService.createIdea(
        values.content,
        values.impact,
        values.ease,
        values.confidence,
      );
      dispatch({ type: "idea_added", idea });
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
      id={FORM_ID}
      row={row}
      {...DEFAULT_IDEA_VALUES}
      submitting={submitting}
      onSubmit={addIdea}
      onCancel={cancelEdit}
    />
  );
};
