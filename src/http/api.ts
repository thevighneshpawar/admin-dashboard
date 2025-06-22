import type { crendentials } from "../types";
import { api } from "./client";

//auth -service
export const login = (crendentials: crendentials) => {
  api.post("/auth/login", crendentials);
};
