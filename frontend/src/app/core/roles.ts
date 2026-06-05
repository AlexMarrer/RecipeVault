export const Role = {
  user: 'user',
  chef: 'chef',
  admin: 'admin',
} as const;

export type Role = (typeof Role)[keyof typeof Role];

export const MANAGE_ROLES: readonly Role[] = [Role.chef, Role.admin];
