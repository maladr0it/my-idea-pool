import { noop } from "../utils";

import { API } from "./config";
import { User, APIError } from "./types";

// store the JWT in memory rather than localStorage, as it may contain sensitive information
let jwt: string | null = null;
let _onSignIn: (user: User) => void = noop;
let _onSignOut: () => void = noop;

const fetchWithJwt = async (...args: Parameters<typeof fetch>) => {
  if (!jwt) {
    throw new Error("No JWT found");
  }
  const [requestInfo, requestInit] = args;
  // attach jwt to header
  const newInit = {
    ...requestInit,
    headers: {
      ...requestInit?.headers,
      "X-Access-Token": jwt,
    },
  };
  const resp = await fetch(requestInfo, newInit);

  if (!resp.ok) {
    const data = (await resp.json()) as APIError;
    throw new Error(data.reason);
  }
  return resp;
};

const refresh = async () => {
  const refreshToken = localStorage.getItem("refresh_token");
  if (!refreshToken) {
    throw new Error("No refresh token found");
  }
  console.log("refresh token valid");

  const body = {
    refresh_token: refreshToken,
  };
  const resp = await fetch(`${API}/access-tokens/refresh`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!resp.ok) {
    const data = (await resp.json()) as APIError;
    throw new Error(data.reason);
  }
  const data = (await resp.json()) as { jwt: string };
  jwt = data.jwt;
};

export const authFetch = async (...args: Parameters<typeof fetch>) => {
  try {
    //  attempt request using the local jwt
    const resp = await fetchWithJwt(...args);
    return resp;
  } catch {
    // if jwt is invalid, refresh it
    await refresh();
    const resp = await fetchWithJwt(...args);
    return resp;
  }
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
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!resp.ok) {
    const data = (await resp.json()) as APIError;
    throw new Error(data.reason);
  }
  const data = (await resp.json()) as { jwt: string; refresh_token: string };
  jwt = data.jwt;
  // ideally we would store this in a HttpOnly cookie, but the API does not provide this
  localStorage.setItem("refresh_token", data.refresh_token);
  const user = await getUser();
  _onSignIn(user);
};

export const signIn = async (email: string, password: string) => {
  const body = { email, password };

  const resp = await fetch(`${API}/access-tokens`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!resp.ok) {
    const data = (await resp.json()) as APIError;
    throw new Error(data.reason);
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

export const init = (
  onSignIn: (user: User) => void = noop,
  onSignOut: () => void = noop,
) => {
  _onSignIn = onSignIn;
  _onSignOut = onSignOut;
};
