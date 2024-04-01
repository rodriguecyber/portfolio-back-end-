import Joi from "joi";

export const validateBlog = Joi.object({
    title: Joi.string()
        .min(5)
        .max(20)
        .required()
        .messages({
            "String.required": "Title is required",
            "string.min": "Title must be at least 5 characters long",
            "string.max": "Title can not exceed 20 characters"     
        }),
    content: Joi.string()
        .min(20)
        .required()
        .messages({
            "String.required": "Content is required",
            "string.min": "Content must be at least 20 characters long",     
        }),
       
});
