import { prisma } from '../config/db';

export const getUserById = (id: number) =>
  prisma.user.findUnique({ where: { id } });

export const updateUser = (id: number, data: any) =>
  prisma.user.update({ where: { id }, data });
