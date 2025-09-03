import type {
  createTenantData,
  createUserData,
  crendentials,
  OrderStatus,
} from "../types";
import { api } from "./client";

export const AUTH_SERVICE = "/api/auth";
const CATALOG_SERVICE = "/api/catalog";
const ORDER_SERVICE = "/api/order";

//auth -service
export const login = (crendentials: crendentials) => {
  api.post(`${AUTH_SERVICE}/auth/login`, crendentials);
};

export const self = () => {
  const res = api.get(`${AUTH_SERVICE}/auth/self`);
  return res;
};

export const logout = () => api.post(`${AUTH_SERVICE}/auth/logout`, {});
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
export const getProducts = (queryParam: string) =>
  api.get(`${CATALOG_SERVICE}/products?${queryParam}`);
export const createProduct = (product: FormData) =>
  api.post(`${CATALOG_SERVICE}/products`, product, {
    headers: { "Content-Type": "multipart/form-data" },
  });
export const getCategory = (id: string) =>
  api.get(`${CATALOG_SERVICE}/categories/${id}`);
export const updateProduct = (product: FormData, id: string) => {
  return api.put(`${CATALOG_SERVICE}/products/${id}`, product, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

// Order service
export const getOrders = (queryString: string) =>
  api.get(`${ORDER_SERVICE}/orders?${queryString}`);

export const getSingle = (orderId: string, queryString: string) =>
  api.get(`${ORDER_SERVICE}/orders/${orderId}?${queryString}`);

export const changeStatus = (orderId: string, data: { status: OrderStatus }) =>
  api.patch(`${ORDER_SERVICE}/orders/change-status/${orderId}`, data);
