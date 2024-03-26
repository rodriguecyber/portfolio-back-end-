import Joi from 'joi'
  
export const validateSchema=Joi.object({
firstName:Joi.string()
.required()
.min(5)
.max(10)
.messages({
"firstName.required":"First name is required",
"firstName.min":"First name must be at least 5 characters long",
"firstName.max":"First name can not exceed 10 characters"   
}),
lastName:Joi.string(),
email:Joi.string().email({ minDomainSegments: 2 })
.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
.required()
.messages({
    "any.required": "Email is required",    
    "string.email": "Invalid email format",
    "email.pattern":"email must look like 'example@gmail.com'"
    }),
    password:Joi.string()
    .min(6)
    .max(10)
    .messages({
    "password.min":"passowrd must have min 5 character",
    "password.max":"passowrd must have max 10 character",

    }),
    role:Joi.string().valid('admin','user')
    .messages({"role.valid":"put user or amdin"})
})



