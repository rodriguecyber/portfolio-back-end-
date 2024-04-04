"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const blogShema = new mongoose_1.default.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    likes: {
        type: Number,
        required: true,
        default: 0
    },
    image: String
}, { strict: false });
const comment = new mongoose_1.default.Schema({
    blogId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'blogs', required: true },
    comment: { type: String, required: true },
    time: { type: String, required: true },
});
exports.commentSchema = mongoose_1.default.model('comment', comment);
const blogs = mongoose_1.default.model('blogs', blogShema);
exports.default = blogs;
