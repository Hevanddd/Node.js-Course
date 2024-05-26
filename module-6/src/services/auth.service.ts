import bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";

import { UserEntity } from "./../models/User";
import authRepository from "../repositories/auth.repository";

const registerUser = async (user: Omit<UserEntity, "id">) => {
  const alreadyCreatedUser = await authRepository.getUser(user);

  if (alreadyCreatedUser) {
    throw {
      status: 401,
      message: `This user is already created`,
    };
  }

  const encryptedPassword = await bcrypt.hash(user.password, 10);

  const { id, email, role } = await authRepository.registerUser({
    ...user,
    password: encryptedPassword,
  });
  return { id, email, role };
};

const loginUser = async (user: Omit<UserEntity, "id">) => {
  const userData = await authRepository.getUser(user);

  if (userData && (await bcrypt.compare(user.password, userData?.password))) {
    const token = jwt.sign(
      { id: userData.id, email: userData.email, role: userData.role },
      process.env.TOKEN_KEY!,
      {
        expiresIn: "2h",
      }
    );
    return { token };
  } else {
    if (!userData) {
      throw {
        status: 404,
        message: `No user with such email or password`,
      };
    }
  }
};

export default { registerUser, loginUser };
