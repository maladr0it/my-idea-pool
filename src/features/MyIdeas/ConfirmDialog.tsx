import React from "react";
import styled from "styled-components/macro";
import { DialogOverlay, DialogContent } from "@reach/dialog";
import "@reach/dialog/styles.css";

import { FlexRow, SecondaryButton } from "../../components";

const StyledDialogContent = styled(DialogContent)`
  width: 100%;
  max-width: 400px;
  margin: 0;
  text-align: center;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
`;

interface Props {
  submitting: boolean;
  onConfirm: () => void;
  onDismiss: () => void;
}

export const ConfirmDialog = ({ submitting, onConfirm, onDismiss }: Props) => {
  return (
    <DialogOverlay
      onDismiss={onDismiss}
      css={`
        display: grid;
        place-items: center;
        background-color: rgba(0, 0, 0, 0.15);
      `}
    >
      <StyledDialogContent aria-label="Confirmation">
        <h1
          css={`
            font-size: 24px;
            font-weight: var(--fontWeight-bold);
          `}
        >
          Are you sure?
        </h1>
        <div
          css={`
            margin-top: 36px;
          `}
        >
          This idea will be permenantly deleted
        </div>
        <FlexRow
          css={`
            margin-top: 72px;
            justify-content: space-around;
          `}
        >
          <SecondaryButton onClick={onDismiss} disabled={submitting}>
            Cancel
          </SecondaryButton>
          <SecondaryButton
            onClick={onConfirm}
            disabled={submitting}
            css={`
              color: var(--primary);
            `}
          >
            OK
          </SecondaryButton>
        </FlexRow>
      </StyledDialogContent>
    </DialogOverlay>
  );
};
