import React from "react";
import styled from "styled-components/macro";
import { useForm } from "react-hook-form";

import { getErrorMessage } from "../../services/utils";
import { useService } from "../../useService";
import { useAuth } from "../../AuthContext";
import { FlexCol, FlexRow, PrimaryButton, Link } from "../../components";

import { FormInput } from "./FormInput";

const H1 = styled.h1`
  font-size: 32px;
  font-weight: var(--fontWeight-bold);
  text-align: center;
`;

interface FormValues {
  name: string;
  email: string;
  password: string;
}

export const SignUp = () => {
  const auth = useAuth();
  const form = useForm<FormValues>();
  const service = useService(auth.signUp);

  const onSubmit = (values: FormValues) => {
    service.call(values.email, values.name, values.password);
  };

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      css={`
        max-width: 480px;
        margin: 96px auto 0;
      `}
    >
      <H1>Sign up</H1>
      <FlexCol
        gap="24px"
        css={`
          margin-top: 48px;
        `}
      >
        <FormInput
          name="name"
          type="text"
          placeholder="Name"
          disabled={service.loading}
          error={form.errors.name?.message}
          ref={form.register({ required: "Required" })}
        />
        <FormInput
          name="email"
          type="email"
          placeholder="Email"
          disabled={service.loading}
          error={form.errors.email?.message}
          ref={form.register({ required: "Required" })}
        />
        <FormInput
          name="password"
          type="password"
          placeholder="Password"
          disabled={service.loading}
          error={form.errors.password?.message}
          ref={form.register({ required: "Required" })}
        />
      </FlexCol>
      <FlexRow
        css={`
          align-items: center;
          margin-top: 12px;
        `}
      >
        <PrimaryButton
          type="submit"
          disabled={service.loading}
          css={`
            min-width: 150px;
            margin-right: 12px;
          `}
        >
          Sign up
        </PrimaryButton>
        <div
          css={`
            margin-left: auto;
          `}
        >
          Already have an account? <Link to="/signin">Log in</Link>
        </div>
      </FlexRow>
      <div
        css={`
          margin-top: 12px;
          font-weight: var(--fontWeight-bold);
          color: var(--warning);
        `}
      >
        {service.error &&
          getErrorMessage(service.error, "Something went wrong...")}
      </div>
    </form>
  );
};
