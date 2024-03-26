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
        "any.required": "First name is required",
        "string.min": "First name must be at least 5 characters long",
        "string.max": "First name can not exceed 10 characters"
    }),
    lastName: joi_1.default.string(),
    email: joi_1.default.string().email({ minDomainSegments: 2 })
        .pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
        .required()
        .messages({
        "any.required": "Email is required",
        "string.email": "Invalid email format",
        "string.pattern.base": "Email must look like 'example@gmail.com'"
    }),
    password: joi_1.default.string()
        .min(6)
        .max(10)
        .messages({
        "string.min": "Password must have at least 6 characters",
        "string.max": "Password must have at most 10 characters",
    }),
    role: joi_1.default.string().valid('admin', 'user')
        .messages({ "any.only": "Role must be either 'admin' or 'user'" })
});
