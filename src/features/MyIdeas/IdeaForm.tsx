import React from "react";
import styled from "styled-components/macro";
import { useForm } from "react-hook-form";

import { FlexCol, TextInput, IconButton } from "../../components";
import confirmImg from "../../assets/Confirm_V@2x.png";
import cancelImg from "../../assets/Cancel_X@2x.png";

import { BaseCell } from "./BaseCell";
import { Select } from "../../components/Select";

const ContentCell = styled(BaseCell)`
  &::before {
    content: "\\2022";
    margin-right: 12px;
    font-size: 36px;
    color: var(--neutral);
  }
`;

const RatingOptions = () => {
  return (
    <>
      {Array.from({ length: 10 }, (_, i) => (
        <option key={i} label={(i + 1).toString()} value={i + 1} />
      ))}
    </>
  );
};

export interface FormValues {
  content: string;
  impact: number;
  ease: number;
  confidence: number;
}

interface Props {
  id: string;
  content: string;
  impact: number;
  ease: number;
  confidence: number;
  average_score?: number;
  created_at?: number;
  row: number;
  submitting: boolean;
  onCancel: () => void;
  onSubmit: (values: FormValues) => void;
}

export const IdeaForm = ({
  id,
  content,
  impact,
  ease,
  confidence,
  average_score,
  // created_at,
  row,
  submitting,
  onSubmit,
  onCancel,
}: Props) => {
  const form = useForm<FormValues>({
    defaultValues: { content, impact, ease, confidence },
  });

  return (
    <>
      <form
        id={id}
        onSubmit={form.handleSubmit(onSubmit)}
        css={`
          position: absolute;
          pointer-events: none;
          visibility: hidden;
        `}
      >
        <button type="submit" />
      </form>
      <ContentCell row={row} col={1}>
        <fieldset
          form={id}
          css={`
            width: 100%;
          `}
        >
          <TextInput
            form={id}
            name="content"
            aria-label="Content"
            autoComplete="off"
            autoFocus
            disabled={submitting}
            ref={form.register({ required: "Required" })}
            css={`
              width: 100%;
            `}
          />
        </fieldset>
      </ContentCell>
      <BaseCell row={row} col={2}>
        <fieldset form={id}>
          <Select
            name="impact"
            aria-label="Impact"
            disabled={submitting}
            ref={form.register()}
          >
            <RatingOptions />
          </Select>
        </fieldset>
      </BaseCell>
      <BaseCell row={row} col={3}>
        <fieldset form={id}>
          <FlexCol>
            <Select
              name="ease"
              aria-label="Ease"
              disabled={submitting}
              ref={form.register()}
            >
              <RatingOptions />
            </Select>
          </FlexCol>
        </fieldset>
      </BaseCell>
      <BaseCell row={row} col={4}>
        <fieldset form={id}>
          <Select
            name="confidence"
            aria-label="Confidence"
            disabled={submitting}
            ref={form.register()}
          >
            <RatingOptions />
          </Select>
        </fieldset>
      </BaseCell>
      <BaseCell row={row} col={5}>
        {average_score?.toFixed(1) || "-"}
      </BaseCell>
      <BaseCell row={row} col={6}>
        <fieldset form={id}>
          <IconButton
            type="submit"
            form={id}
            aria-label="Submit"
            disabled={submitting}
          >
            <img src={confirmImg} alt="" />
          </IconButton>
          <IconButton
            type="button"
            form={id}
            aria-label="Cancel"
            onClick={onCancel}
            disabled={submitting}
            css={`
              margin-left: 12px;
            `}
          >
            <img src={cancelImg} alt="" />
          </IconButton>
        </fieldset>
      </BaseCell>
    </>
  );
};
