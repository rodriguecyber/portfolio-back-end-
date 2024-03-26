import Joi from 'joi';
  
export const validateSchema = Joi.object({
  firstName: Joi.string()
    .required()
    .min(5)
    .max(10)
    .messages({
      "any.required": "First name is required",
      "string.min": "First name must be at least 5 characters long",
      "string.max": "First name can not exceed 10 characters"   
    }),
  lastName: Joi.string(),
  email: Joi.string().email({ minDomainSegments: 2 })
    .pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
    .required()
    .messages({
      "any.required": "Email is required",    
      "string.email": "Invalid email format",
      "string.pattern.base":"Email must look like 'example@gmail.com'"
    }),
  password: Joi.string()
    .min(6)
    .max(10)
    .messages({
      "string.min":"Password must have at least 6 characters",
      "string.max":"Password must have at most 10 characters",
    }),
  role: Joi.string().valid('admin', 'user')
    .messages({"any.only": "Role must be either 'admin' or 'user'"})
});
