import { IRole } from '../role/types/role.interface';

export const roles: IRole[] = [
  {
    _id: 'f3bf7fe3-5fb3-403f-bbbc-4f99f37109e7',
    name: 'Admin',
    permissions: ['db88be5c-e46e-40ac-9aa5-ae4e3b749b50'],
  },
  {
    _id: '61efbdc2-73a6-4f25-bca6-cd14afd23a1a',
    name: 'User',
    permissions: ['9a565ba3-6c58-4812-9021-87f0d79f57ca'],
  },
];
