import { API } from "./config";

// store the JWT in memory rather than localStorage, as it may contain sensitive information
let jwt: string | null = null;

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
    throw new Error("JWT invalid");
  }
  return resp;
};

const refresh = async () => {
  const refreshToken = localStorage.getItem("refresh_token");
  if (!refreshToken) {
    throw new Error("No refresh token found");
  }
  const body = {
    refresh_token: refreshToken,
  };
  const resp = await fetch(`${API}/access-tokens/refresh`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!resp.ok) {
    throw new Error("Refresh token invalid");
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
    // if the jwt was invalid, refresh the token and try with a new one
    await refresh();
    const resp = await fetchWithJwt(...args);
    return resp;
  }
};

export interface User {
  email: string;
  name: string;
  avatar_url: string;
}

const getUser = async () => {
  const resp = await authFetch(`${API}/me`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  const data = (await resp.json()) as User;
  return data;
};

export const restoreSession = getUser;

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
    throw new Error("Bad sign up");
  }
  const data = (await resp.json()) as { jwt: string; refresh_token: string };
  jwt = data.jwt;
  // ideally we would store this in a HttpOnly cookie, but the API does not provide this
  localStorage.setItem("refresh_token", data.refresh_token);
  return getUser();
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
    throw new Error("Bad sign in");
  }
  const data = (await resp.json()) as { jwt: string; refresh_token: string };
  jwt = data.jwt;
  // ideally we would store this in a HttpOnly cookie, but the API does not provide this
  localStorage.setItem("refresh_token", data.refresh_token);
  return getUser();
};

export const signOut = () => {
  localStorage.removeItem("refresh_token");
  jwt = null;
};
