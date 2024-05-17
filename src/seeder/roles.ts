import { IRole } from '../role/types/role.interface.js';

export const roles: IRole[] = [
  {
    _id: 'f3bf7fe3-5fb3-403f-bbbc-4f99f37109e7',
    name: 'Admin',
    permissions: [
      'a2d04ac0-eb10-482c-9a82-0bca5c531e74',
      'a444ce1c-c932-4795-bc31-461db762fb40',
      '9a565ba3-6c58-4812-9021-87f0d79f57ca',
    ],
  },
  {
    _id: '61efbdc2-73a6-4f25-bca6-cd14afd23a1a',
    name: 'User',
    permissions: [
      '1df40fa5-4499-44e5-b0db-b8683cd58a5b',
      'db88be5c-e46e-40ac-9aa5-ae4e3b749b50',
      '0f7b643b-97c8-4eab-b70c-a455e8acbade',
    ],
  },
];
