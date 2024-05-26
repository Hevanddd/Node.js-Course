import joi from "joi";

export const user = joi.object({
  email: joi.string().email().required(),
  password: joi.string().required(),
});

export const newUser = user.keys({
  role: joi.string().required(),
});
