import { getUserById, updateUser } from '../repositories/user.repo';
import { ApiError } from '../middlewares/error.middleware';

export const getProfile = async (id: number) => {
  const user = await getUserById(id);
  if (!user) throw new ApiError(404, 'User not found');
  return user;
};

export const editProfile = async (id: number, data: { name?: string; avatar?: string }) => {
  const user = await updateUser(id, data);
  return user;
};
