import { Idea } from "./types";
import { API } from "./config";
import { authFetch } from "./auth";

export const createIdea = async (
  content: string,
  impact: number,
  ease: number,
  confidence: number,
) => {
  const body = { content, impact, ease, confidence };

  const resp = await authFetch(`${API}/ideas`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = (await resp.json()) as Idea;
  return data;
};

export const getIdeas = async (pageNum: number) => {
  const resp = await authFetch(`${API}/ideas/?page=${pageNum}`);
  const data = (await resp.json()) as Idea[];
  return data;
};

export const deleteIdea = async (id: string) => {
  await authFetch(`${API}/ideas/${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });
};

export const updateIdea = async (
  id: string,
  content: string,
  impact: number,
  ease: number,
  confidence: number,
) => {
  const body = { content, impact, ease, confidence };

  const resp = await authFetch(`${API}/ideas/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = (await resp.json()) as Idea;
  return data;
};
