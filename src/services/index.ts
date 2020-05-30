import { API } from "./config";
import { authFetch } from "./auth";

export interface User {
  email: string;
  name: string;
  avatar_url: string;
}

export { signIn } from "./auth";

export const getUser = async () => {
  const resp = await authFetch(`${API}/me`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  const data = (await resp.json()) as User;
  return data;
};
