import type { createTenantData, createUserData, crendentials } from "../types";
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
export const getUsers = (queryString: string) =>
  api.get(`/users?${queryString}`);
export const getRestaurants = () => api.get("/tenants");
export const createUser = (user: createUserData) => api.post("/users", user);
export const createTenants = (tenant: createTenantData) =>
  api.post("/tenants", tenant);
