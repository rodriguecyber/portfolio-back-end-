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
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const userAuth_1 = require("../middleware/userAuth");
const transpoter_1 = __importDefault(require("../middleware/transpoter"));
const subscriber_1 = __importDefault(require("../models/subscriber"));
const blogs_1 = require("../models/blogs");
const blogs_2 = __importDefault(require("../models/blogs"));
const cloudinary = require('cloudinary').v2;
cloudinary.config({
    cloud_name: 'dxy33wiax',
    api_key: '991555379284442',
    api_secret: 'ekuY9MDxVtiIeUGqKbLS0V8MTV4'
});
const storage = multer_1.default.diskStorage({
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
const uploadService = (0, multer_1.default)({ storage: storage });
const blogRouter = (0, express_1.default)();
blogRouter.post('/addblog', userAuth_1.userAuth, uploadService.single('image'), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.file) {
            return res.status(400).send("No image provided");
        }
        const result = yield cloudinary.uploader.upload(req.file.path);
        const newBlog = new blogs_2.default({
            title: req.body.title,
            content: req.body.content,
            time: new Date(Date.now()).toISOString(),
            image: result.secure_url
        });
        // const validation = validateBlog.validate(newBlog);
        // if (validation.error) {
        //   res.json(validation.error);
        // } else {
        yield newBlog.save();
        const savedEmails = yield subscriber_1.default.find();
        savedEmails.map(email => {
            const mailOptions = {
                from: 'rodrirwigara',
                to: email.email,
                subject: "New Article",
                text: "Rwigara Brand has new Article"
            };
            transpoter_1.default.sendMail(mailOptions);
        });
        res.json({ message: "Blog saved" });
        // }
    }
    catch (error) {
        res.json(error);
    }
}));
blogRouter.get('/blogs', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const blogsWithComments = yield blogs_2.default.aggregate([
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
                    _id: 1,
                    title: 1,
                    content: 1,
                    time: 1,
                    likes: 1,
                    image: 1,
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
blogRouter.post('/comment/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newComment = new blogs_1.commentSchema({
            blogId: req.params.id,
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
blogRouter.patch('/updateBlog/:id', userAuth_1.userAuth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield blogs_2.default.findByIdAndUpdate(req.params.id, req.body, { new: true })
            .then(updated => {
            if (updated === null) {
                res.json('blog not found');
            }
            else {
                res.json(`blog update to ${updated}`);
            }
        })
            .catch(error => {
            res.json(error.message);
        });
    }
    catch (error) {
        res.json(error.mesaage);
    }
}));
blogRouter.delete('/deleteblog/:id', userAuth_1.userAuth, (0, userAuth_1.authorize)('admin', 'write'), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield blogs_2.default.findByIdAndDelete(req.params.id);
        yield blogs_1.commentSchema.deleteMany({ blogId: req.params.id })
            .then(deleted => {
            if (deleted === null) {
                return res.status(404).json("No post found");
            }
            else {
                res.status(200).json({ blog: `blog  deleted successfull` });
            }
        })
            .catch(error => {
            res.json(error);
        });
    }
    catch (error) {
        res.json(error);
    }
}));
blogRouter.patch('/like/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const liked = req.body.liked;
    const blogId = req.params.id;
    yield blogs_2.default.findById(blogId)
        .then(data => {
        if (!data) {
            res.json('no blog found');
        }
        else {
            if (liked) {
                data.updateOne({ $inc: { likes: 1 } })
                    .then(result => {
                    if (!result) {
                        res.json({ message: 'failed to like' });
                    }
                    else {
                        res.json({ message: `you liked blog "${data.title}` });
                    }
                });
            }
            else {
                res.json({ message: 'please set liked to true' });
            }
        }
    });
}));
exports.default = blogRouter;
