import { noop } from "../utils";

import { API } from "./config";
import { User, APIErrorData, APIError } from "./types";

// store the JWT in memory rather than localStorage, as it may contain sensitive information
let jwt: string | null = null;
let _onSignIn: (user: User) => void = noop;
let _onSignOut: () => void = noop;

// attaches the jwt to the header
const fetchWithJwt = async (...args: Parameters<typeof fetch>) => {
  if (!jwt) {
    throw new Error("No JWT found, obtain one before calling this function");
  }

  const [requestInfo, requestInit] = args;
  const newInit = {
    ...requestInit,
    headers: {
      ...requestInit?.headers,
      "X-Access-Token": jwt,
    },
  };
  return fetch(requestInfo, newInit);
};

const refresh = async (token: string) => {
  const body = {
    refresh_token: token,
  };
  return fetch(`${API}/access-tokens/refresh`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
};

const refreshThenFetch = async (...args: Parameters<typeof fetch>) => {
  const token = localStorage.getItem("refresh_token");

  if (!token) {
    signOut();
    throw new Error("No refresh token");
  }
  const refreshResp = await refresh(token);

  if (!refreshResp.ok) {
    signOut();
    throw new Error("Token refresh failed");
  }
  const refreshData = (await refreshResp.json()) as { jwt: string };
  jwt = refreshData.jwt;
  const fetchResp = await fetchWithJwt(...args);

  if (fetchResp.status === 401) {
    signOut();
    throw new Error("Invalid jwt");
  }
  if (!fetchResp.ok) {
    const errorData = (await fetchResp.json()) as APIErrorData;
    throw new APIError(errorData.reason);
  }
  return fetchResp;
};

export const signIn = async (email: string, password: string) => {
  const body = { email, password };

  const resp = await fetch(`${API}/access-tokens`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!resp.ok) {
    const data = (await resp.json()) as APIErrorData;
    throw new APIError(data.reason);
  }
  const data = (await resp.json()) as { jwt: string; refresh_token: string };
  jwt = data.jwt;
  // ideally we would store this in a HttpOnly cookie, but the API does not provide this
  localStorage.setItem("refresh_token", data.refresh_token);
  const user = await getUser();
  _onSignIn(user);
};

export const signOut = () => {
  localStorage.removeItem("refresh_token");
  jwt = null;
  _onSignOut();
};

export const authFetch = async (...args: Parameters<typeof fetch>) => {
  if (!jwt) {
    return refreshThenFetch(...args);
  }
  const resp = await fetchWithJwt(...args);

  if (resp.status === 401) {
    return refreshThenFetch(...args);
  }
  if (!resp.ok) {
    const errorData = (await resp.json()) as APIErrorData;
    throw new APIError(errorData.reason);
  }
  return resp;
};

const getUser = async () => {
  const resp = await authFetch(`${API}/me`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  const data = (await resp.json()) as User;
  return data;
};

export const restoreSession = async () => {
  try {
    const user = await getUser();
    _onSignIn(user);
  } catch {
    _onSignOut();
  }
};

export const signUp = async (email: string, name: string, password: string) => {
  const body = { email, name, password };

  const resp = await fetch(`${API}/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!resp.ok) {
    const data = (await resp.json()) as APIErrorData;
    throw new APIError(data.reason);
  }
  const data = (await resp.json()) as { jwt: string; refresh_token: string };
  jwt = data.jwt;
  // ideally we would store this in a HttpOnly cookie, but the API does not provide this
  localStorage.setItem("refresh_token", data.refresh_token);
  const user = await getUser();
  _onSignIn(user);
};

export const init = (
  onSignIn: (user: User) => void = noop,
  onSignOut: () => void = noop,
) => {
  _onSignIn = onSignIn;
  _onSignOut = onSignOut;
};

export const DEBUG_CLEAR_JWT = () => {
  jwt = "";
};

export const DEBUG_CLEAR_REFRESH_TOKEN = () => {
  localStorage.removeItem("refresh_token");
};
