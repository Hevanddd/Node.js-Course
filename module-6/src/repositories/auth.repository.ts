import User, { UserEntity } from "../models/User";

const getUser = async ({
  email,
}: Omit<UserEntity, "id">): Promise<UserEntity | null> => {
  return await User.findOne({ email });
};

const registerUser = async (
  user: Omit<UserEntity, "id">
): Promise<UserEntity> => {
  return await User.create(user);
};

export default { registerUser, getUser };
