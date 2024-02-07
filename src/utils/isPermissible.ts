// TODO: attached user to the request should have compatible types for this to work
export const isPermissible = (
  permissions: string[],
  requiredPermissions: string[],
) => requiredPermissions.every((p) => permissions.includes(p));
