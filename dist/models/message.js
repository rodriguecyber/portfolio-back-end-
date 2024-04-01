"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const message = new mongoose_1.default.Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    text: String,
    time: Date
});
const messageSchema = mongoose_1.default.model('messages', message);
exports.default = messageSchema;
