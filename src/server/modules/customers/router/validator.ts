import Joi from "joi";

export const schemaEmail = Joi.object({
  email: Joi.string().email()
});

export const schemaEmailCode = Joi.object({
  emailCode: Joi.string().length(6)
});
