import Joi from "joi";

export const schemaKYCVerificationsInit = Joi.object({
  FlowID: Joi.string().length(24),
  IdKYCVerification: Joi.string()!.length(36)
});

export const schemaKYCVerificationsInput = Joi.object({
  IdKYCVerification: Joi.string()!.length(36),
  Type: Joi.string().max(10),
  Country: Joi.string()!.length(2)  
});


