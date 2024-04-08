import joi from "joi";

export const userCartPostSchema = joi.object({
  productId: joi.string().required(),
  count: joi.number().required(),
});
