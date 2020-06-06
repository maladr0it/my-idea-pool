import { createContext, useContext, Dispatch } from "react";

import { Idea } from "../../services/types";

type IdeasState =
  | {
      status: "idle";
      error: null;
      editingId: string | null;
      ideas: Idea[];
    }
  | {
      status: "requesting_ideas";
      error: null;
      editingId: null;
      ideas: Idea[];
    }
  | {
      status: "requesting_ideas_error";
      error: Error;
      editingId: null;
      ideas: Idea[];
    }
  | {
      status: "adding_idea";
      error: null;
      editingId: null;
      ideas: Idea[];
    }
  | {
      status: "editing_idea";
      error: null;
      editingId: string;
      ideas: Idea[];
    };

type IdeasAction =
  | {
      type: "ideas_request_started";
    }
  | {
      type: "ideas_request_successful";
      ideas: Idea[];
    }
  | {
      type: "ideas_request_failed";
      error: Error;
    }
  | {
      type: "idea_added";
      idea: Idea;
    }
  | {
      type: "idea_removed";
      id: string;
    }
  | {
      type: "idea_updated";
      idea: Idea;
    }
  | {
      type: "draft_idea_created";
    }
  | {
      type: "editing_started";
      id: string;
    }
  | {
      type: "editing_cancelled";
    };

export const reducer = (state: IdeasState, action: IdeasAction): IdeasState => {
  console.log(action);

  switch (action.type) {
    case "ideas_request_started": {
      return {
        ...state,
        status: "requesting_ideas",
        error: null,
        editingId: null,
      };
    }
    case "ideas_request_successful": {
      return {
        status: "idle",
        error: null,
        editingId: null,
        ideas: action.ideas,
      };
    }
    case "ideas_request_failed": {
      return {
        ...state,
        status: "requesting_ideas_error",
        error: action.error,
        editingId: null,
      };
    }
    case "idea_added": {
      return {
        status: "idle",
        error: null,
        editingId: null,
        ideas: [action.idea, ...state.ideas],
      };
    }
    case "idea_removed": {
      return {
        status: "idle",
        error: null,
        editingId: null,
        ideas: state.ideas.filter((idea) => idea.id !== action.id),
      };
    }
    case "idea_updated": {
      const index = state.ideas.findIndex((idea) => idea.id === action.idea.id);

      return {
        status: "idle",
        error: null,
        editingId: null,
        ideas: [
          ...state.ideas.slice(0, index),
          action.idea,
          ...state.ideas.slice(index + 1),
        ],
      };
    }
    case "draft_idea_created": {
      return {
        ...state,
        status: "adding_idea",
        error: null,
        editingId: null,
      };
    }
    case "editing_started": {
      return {
        ...state,
        status: "editing_idea",
        error: null,
        editingId: action.id,
      };
    }
    case "editing_cancelled": {
      return {
        ...state,
        status: "idle",
        error: null,
        editingId: null,
      };
    }
    default:
      return state;
  }
};

type ContextValue = [IdeasState, Dispatch<IdeasAction>];

export const IdeasContext = createContext<ContextValue | undefined>(undefined);

export const useIdeasContext = () => {
  const value = useContext(IdeasContext);

  if (value === undefined) {
    throw new Error(
      "useIdeasContext must be used in a descendent of IdeasContext.Provider",
    );
  }

  return value;
};

export const getIdea = (state: IdeasState, id: string) =>
  state.ideas.find((idea) => idea.id === id)!;
