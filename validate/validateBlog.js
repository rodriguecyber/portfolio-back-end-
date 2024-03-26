"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateBlog = void 0;
const joi_1 = __importDefault(require("joi"));
exports.validateBlog = joi_1.default.object({
    title: joi_1.default.string()
        .min(5)
        .max(20)
        .required()
        .messages({
        "any.required": "First name is required",
        "string.min": "First name must be at least 5 characters long",
        "string.max": "First name can not exceed 10 characters"
    }),
    conent: joi_1.default.string().min(20)
        .messages({
        "any.required": "content is required",
        "string.min": "content must be at least 20 characters long",
    }),
});
