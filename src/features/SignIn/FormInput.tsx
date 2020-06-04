import React, { forwardRef } from "react";
import "styled-components/macro";

import { TextInput } from "../../components/TextInput";
import { FlexCol } from "../../components/FlexCol";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: React.ReactNode;
}

export const FormInput = forwardRef<HTMLInputElement, Props>(
  ({ error, ...rest }, ref) => {
    return (
      <FlexCol>
        <TextInput {...rest} ref={ref} />
        <div
          css={`
            height: 1em;
            margin-top: 4px;
            font-weight: var(--fontWeight-bold);
            color: var(--warning);
          `}
        >
          {error}
        </div>
      </FlexCol>
    );
  },
);
