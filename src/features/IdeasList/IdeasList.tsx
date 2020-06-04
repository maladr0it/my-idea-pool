import React from "react";
import styled from "styled-components/macro";
import { Redirect } from "react-router-dom";

import { useAuth } from "../../AuthContext";
import { FlexCol } from "../../components/FlexCol";

export const IdeasList = () => {
  const auth = useAuth();

  if (!auth.user) {
    return <Redirect to="/signup" />;
  }

  return (
    <>
      <h1>You are logged in</h1>
    </>
  );
};
