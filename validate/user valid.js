"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.validateSchema = joi_1.default.object({
    firstName: joi_1.default.string()
        .required()
        .min(5)
        .max(10)
        .messages({
        "firstName.required": "First name is required",
        "firstName.min": "First name must be at least 5 characters long",
        "firstName.max": "First name can not exceed 10 characters"
    }),
    lastName: joi_1.default.string(),
    email: joi_1.default.string().email({ minDomainSegments: 2 })
        .pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
        .required()
        .messages({
        "any.required": "Email is required",
        "string.email": "Invalid email format",
        "email.pattern": "email must look like 'example@gmail.com'"
    }),
    password: joi_1.default.string()
        .min(6)
        .max(10)
        .messages({
        "password.min": "passowrd must have min 5 character",
        "password.max": "passowrd must have max 10 character",
    }),
    role: joi_1.default.string().valid('admin', 'user')
        .messages({ "role.valid": "put user or amdin" })
});
