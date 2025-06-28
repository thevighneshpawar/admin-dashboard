import type { crendentials } from "../types";
import { api } from "./client";

//auth -service
export const login = (crendentials: crendentials) => {
  api.post("/auth/login", crendentials);
};

export const self = () => {
  const res = api.get("/auth/self");
  return res;
};

export const logout = () => api.post("/auth/logout");
export const getUsers = () => api.get("/users");
export const getRestaurants = () => api.get("/tenants");
