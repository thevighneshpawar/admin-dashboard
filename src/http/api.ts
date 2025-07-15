import type { createTenantData, createUserData, crendentials } from "../types";
import { api } from "./client";

export const AUTH_SERVICE = "/api/auth";
const CATALOG_SERVICE = "/api/catalog";

//auth -service
export const login = (crendentials: crendentials) => {
  api.post(`${AUTH_SERVICE}/auth/login`, crendentials);
};

export const self = () => {
  const res = api.get(`${AUTH_SERVICE}/auth/self`);
  return res;
};

export const logout = () => api.post("${AUTH_SERVICE}/auth/logout", {});
export const getUsers = (queryString: string) =>
  api.get(`${AUTH_SERVICE}/users?${queryString}`);
export const getRestaurants = (queryString: string) =>
  api.get(`${AUTH_SERVICE}/tenants?${queryString}`);
export const createUser = (user: createUserData) =>
  api.post(`${AUTH_SERVICE}/users`, user);
export const createTenants = (tenant: createTenantData) =>
  api.post(`${AUTH_SERVICE}/tenants`, tenant);

export const updateUser = (user: createUserData, id: number) =>
  api.patch(`${AUTH_SERVICE}/users/${id}`, user);

export const updateTenant = (tenant: createTenantData, id: number) =>
  api.patch(`${AUTH_SERVICE}/tenants/${id}`, tenant);

export const deleteTenant = (id: number) =>
  api.delete(`${AUTH_SERVICE}/tenants/${id}`);

//catalog service

export const getCategories = () => api.get(`${CATALOG_SERVICE}/categories`);
