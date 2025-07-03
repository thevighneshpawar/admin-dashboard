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
export const getRestaurants = (queryString: string) =>
  api.get(`/tenants?${queryString}`);
export const createUser = (user: createUserData) => api.post("/users", user);
export const createTenants = (tenant: createTenantData) =>
  api.post("/tenants", tenant);

export const updateUser = (user: createUserData, id: number) =>
  api.patch(`/users/${id}`, user);
