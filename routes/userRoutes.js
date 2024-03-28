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
const usermodel_1 = __importDefault(require("../models/usermodel"));
const user_valid_1 = require("../validate/user valid");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userAuth_1 = require("../middleware/userAuth");
const transpoter_1 = __importDefault(require("../middleware/transpoter"));
const subscriber_1 = __importDefault(require("../models/subscriber"));
const userRouter = (0, express_1.default)();
userRouter.post('/signup', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newuser = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password
    };
    const validation = user_valid_1.validateSchema.validate(newuser);
    if (validation.error) {
        return res.status(400).json({ error: validation.error.details[0].message });
    }
    try {
        const user = yield usermodel_1.default.create(newuser);
        return res.json({ message: "Registered Successfully", user });
    }
    catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ error: 'User already exists' });
        }
        else {
            return res.status(500).json({ error: error.message });
        }
    }
}));
userRouter.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const username = req.body.email;
    const password = req.body.password;
    yield usermodel_1.default.findOne({ email: username })
        .then((user) => {
        if (!user) {
            res.json({ message: 'user not found' });
        }
        else {
            if (user.password === password) {
                const expire = eval(process.env.TOKEN_EXPIRE);
                const token = jsonwebtoken_1.default.sign({ userId: user._id, exp: expire }, process.env.JWT_SECRET);
                req.currentUser = user;
                res.json({ message: 'logged in', user: user, token: token });
            }
            else {
                res.json({ message: 'password not match' });
            }
        }
    });
}));
userRouter.get('/dashboard', userAuth_1.userAuth, (req, res) => {
    res.json({ message: "signed in as ", user: req.currentUser });
});
userRouter.post('/forgot-password', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.body.email;
    yield usermodel_1.default.findOne({ email: email })
        .then((user) => {
        if (!user) {
            res.json('user not found');
        }
        else {
            const exp = eval(process.env.RESETEXP);
            const token = jsonwebtoken_1.default.sign({ user: user._id, exp: exp }, process.env.RESET);
            const mailOptions = {
                from: 'rodrirwigara@gmail.com',
                to: email,
                subject: 'reset password',
                text: `http://127.0.0.1:5000/reset-password?token=${token}   don't share token with anyone`
            };
            transpoter_1.default.sendMail(mailOptions, (error, info) => {
                if (error) {
                    res.json(error);
                }
                else {
                    res.json({ message: 'token sent. check your email' });
                }
            });
        }
    });
}));
userRouter.post('/reset-password', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.body.token;
    const password = req.body.password;
    jsonwebtoken_1.default.verify(token, process.env.RESET, (error, decoded) => __awaiter(void 0, void 0, void 0, function* () {
        if (error) {
            res.json(error.message);
        }
        else {
            try {
                const user = usermodel_1.default.findOne({ _id: decoded.user });
                yield user.updateOne({
                    $set: {
                        password: password
                    }
                });
                res.json({ message: "Password has been changed successfully!" });
            }
            catch (err) {
                res.json(error);
            }
        }
    }));
}));
userRouter.get('/subscriber', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const subscribers = yield subscriber_1.default.find();
        const subscibeInfo = subscribers.map(result => ({
            name: result.name,
            email: result.email
        }));
        res.json(subscibeInfo);
    }
    catch (error) {
        res.json(error);
    }
}));
exports.default = userRouter;
