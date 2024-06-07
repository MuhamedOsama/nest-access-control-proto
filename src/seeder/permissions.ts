import { IPermission } from '../permission/types/permission.interface';

export const permissions: IPermission[] = [
  {
    _id: 'a444ce1c-c932-4795-bc31-461db762fb40',
    action: 'create',
    subject: 'user',
  },
  {
    _id: '9a565ba3-6c58-4812-9021-87f0d79f57ca',
    action: 'read',
    subject: 'user',
  },
  {
    _id: '1df40fa5-4499-44e5-b0db-b8683cd58a5b',
    action: 'delete',
    subject: 'user',
  },
  {
    _id: 'db88be5c-e46e-40ac-9aa5-ae4e3b749b50',
    action: 'manage',
    subject: 'user',
  },
];
