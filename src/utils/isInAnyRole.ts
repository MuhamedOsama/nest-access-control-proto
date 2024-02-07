export const isInAnyRole = (role: string, allowedRoles: string[]) =>
  allowedRoles.includes(role);
