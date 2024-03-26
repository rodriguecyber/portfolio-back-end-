"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const blogs_1 = __importDefault(require("../models/blogs"));
const express_1 = __importDefault(require("express"));
const blogs_2 = require("../models/blogs");
const userAuth_1 = require("../middleware/userAuth");
const validateBlog_1 = require("../validate/validateBlog");
const blogRouter = (0, express_1.default)();
blogRouter.post('/addblogs', userAuth_1.userAuth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newBlog = new blogs_1.default({
            title: req.body.title,
            content: req.body.content,
            time: new Date(Date.now()).toISOString()
        });
        const validate = validateBlog_1.validateBlog.validate(newBlog);
        if (validate.error) {
            return res.json({ error: validate.error.details[0].message });
        }
        yield newBlog.save();
        res.json({ message: "blog saved " });
    }
    catch (error) {
        res.json(error);
    }
}));
blogRouter.get('/blog', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const blogsWithComments = yield blogs_1.default.aggregate([
            {
                $lookup: {
                    from: "comments",
                    localField: "_id",
                    foreignField: "blogId",
                    as: "comments"
                }
            },
            {
                $project: {
                    _id: 0,
                    title: 1,
                    content: 1,
                    time: 1,
                    "comments.comment": 1,
                    "comments.time": 1
                }
            }
        ]);
        res.json(blogsWithComments);
    }
    catch (error) {
        res.json(error);
    }
}));
blogRouter.post('/comment', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newComment = new blogs_2.commentSchema({
            blogId: req.body.blogId,
            comment: req.body.comment,
            time: new Date(Date.now()).toISOString()
        });
        yield newComment.save();
        res.json({ message: "commment sent" });
    }
    catch (error) {
        res.json(error);
    }
}));
exports.default = blogRouter;
