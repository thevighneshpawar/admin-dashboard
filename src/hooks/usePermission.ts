import type { User } from "../types";

export const usePermission = () => {
  const allowedRoles = ["admin", "manager"];

  // this underscore defines this function as a private function
  const _hasPermission = (user: User | null): boolean => {
    if (!user) return false;
    return allowedRoles.includes(user.role);
  };

  //here isAllowed is a function that takes user as an argument and returns true or false
  // we can expose isAllowed instead of _hasPermission
  return {
    isAllowed: _hasPermission,
  };
};
