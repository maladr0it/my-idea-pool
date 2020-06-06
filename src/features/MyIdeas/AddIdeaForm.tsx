import React from "react";

import * as ideasService from "../../services/ideas";
import { useService } from "../../useService";

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

  const service = useService(async (values: FormValues) => {
    const idea = await ideasService.createIdea(
      values.content,
      values.impact,
      values.ease,
      values.confidence,
    );
    dispatch({ type: "idea_added", idea });
  });

  const cancelEdit = () => {
    dispatch({ type: "editing_cancelled" });
  };

  return (
    <IdeaForm
      id={FORM_ID}
      row={row}
      {...DEFAULT_IDEA_VALUES}
      submitting={service.loading}
      onSubmit={service.call}
      onCancel={cancelEdit}
    />
  );
};
