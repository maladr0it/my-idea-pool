import React, { createContext, useEffect, useReducer } from "react";
import styled from "styled-components/macro";
import { Redirect } from "react-router-dom";

// this should really be an svg...
import addIdeaImg from "../../assets/btn_addanidea.png";
import { getErrorMessage } from "../../services/utils";
import * as ideasService from "../../services/ideas";
import { useAuth } from "../../AuthContext";
import { FlexRow } from "../../components";

import { IdeasContext, reducer } from "./IdeasContext";
import { IdeaList } from "./IdeaList";

import {
  DEBUG_CLEAR_JWT,
  DEBUG_CLEAR_REFRESH_TOKEN,
} from "../../services/auth";

const AddIdeaButton = styled.button`
  margin-left: auto;
  background-color: transparent;
  padding: 0;
  border: none;
  cursor: pointer;
`;

export const MyIdeas = () => {
  const auth = useAuth();
  const [state, dispatch] = useReducer(reducer, {
    status: "idle",
    error: null,
    editingId: null,
    ideas: [],
  });

  useEffect(() => {
    if (auth.user) {
      const getIdeas = async (page: number) => {
        try {
          dispatch({ type: "ideas_request_started" });
          const ideas = await ideasService.getIdeas(page);
          dispatch({ type: "ideas_request_successful", ideas });
        } catch (error) {
          dispatch({ type: "ideas_request_failed", error });
        }
      };
      // just get page 1
      getIdeas(1);
    }
  }, [auth.user]);

  const handleAddClick = () => {
    dispatch({ type: "draft_idea_created" });
  };

  if (!auth.user) {
    return <Redirect to="/signup" />;
  }

  return (
    <IdeasContext.Provider value={[state, dispatch]}>
      <div
        css={`
          max-width: 1000px;
          margin: 0 auto;
          padding: 0 72px;
        `}
      >
        <FlexRow
          as="header"
          css={`
            align-items: center;
            padding: 24px;
            border-bottom: 1px solid var(--neutral);
          `}
        >
          <h1
            css={`
              font-size: 28px;
              font-weight: var(--fontWeight-bold);
            `}
          >
            My Ideas
          </h1>
          <AddIdeaButton aria-label="Add an idea" onClick={handleAddClick}>
            <img
              src={addIdeaImg}
              alt=""
              css={`
                display: block;
                width: 48px;
              `}
            />
          </AddIdeaButton>
        </FlexRow>
        {state.status !== "requesting_ideas" &&
          state.status !== "requesting_ideas_error" && <IdeaList />}
        {state.status === "requesting_ideas" && <div>Loading...</div>}
        {state.status === "requesting_ideas_error" && (
          <div>{getErrorMessage(state.error, "Something went wrong...")}</div>
        )}
      </div>
    </IdeasContext.Provider>
  );
};
