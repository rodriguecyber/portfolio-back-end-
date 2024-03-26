import Joi from "joi";
export const validateBlog = Joi.object({
    title: Joi.string()
    .min(5)
    .max(20)
    .required()
    .messages({
     "any.required": "First name is required",
      "string.min": "First name must be at least 5 characters long",
      "string.max": "First name can not exceed 10 characters"     
    }),
   conent:Joi.string().min(20)
    .messages({
        "any.required": "content is required",
         "string.min": "content must be at least 20 characters long",     
       }),
})