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
        "String.required": "Title is required",
        "string.min": "Title must be at least 5 characters long",
        "string.max": "Title can not exceed 20 characters"
    }),
    content: joi_1.default.string()
        .min(20)
        .required()
        .messages({
        "String.required": "Content is required",
        "string.min": "Content must be at least 20 characters long",
    }),
});
