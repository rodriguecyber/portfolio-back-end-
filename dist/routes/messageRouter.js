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
const message_1 = __importDefault(require("../models/message"));
const express_1 = __importDefault(require("express"));
const userAuth_1 = require("../middleware/userAuth");
const subscriber_1 = __importDefault(require("../models/subscriber"));
const transpoter_1 = __importDefault(require("../middleware/transpoter"));
const messageRouter = (0, express_1.default)();
messageRouter.post('/Sendmessage', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const message = new message_1.default({
        name: req.body.name,
        email: req.body.email,
        text: req.body.text,
        time: Date.now(),
    });
    try {
        yield message.save()
            .then((result) => __awaiter(void 0, void 0, void 0, function* () {
            const subscribed = req.body.subscribe;
            if (subscribed === true) {
                try {
                    yield subscriber_1.default.create({ name: result.name, email: result.email });
                    const mailOptions = {
                        from: 'rodrirwigara@gmail.com',
                        to: result.email,
                        subject: 'subscription',
                        text: `Mr/Mrs ${result.name} thank you for subscribe to our Website`
                    };
                    transpoter_1.default.sendMail(mailOptions, (error, info) => {
                        if (error) {
                            res.send(error);
                        }
                        else {
                            res.json();
                        }
                    });
                }
                catch (error) {
                    if (error.code === 11000) {
                        const mailOptions = {
                            from: 'rodrirwigara@gmail.com',
                            to: result.email,
                            subject: 'subscription',
                            text: `Mr/Mrs ${result.name} thank you for contact us`
                        };
                        transpoter_1.default.sendMail(mailOptions, (error, info) => {
                            if (error) {
                                res.send(error);
                            }
                            else {
                                res.json();
                            }
                        });
                    }
                }
            }
            res.send({ message: "thank you for contact us" });
            const mailOptions = {
                from: 'rodrirwigara@gmail.com',
                to: result.email,
                subject: 'subscription',
                text: `Mr/Mrs ${result.name} thank you for contact us`
            };
            transpoter_1.default.sendMail(mailOptions).then(() => console.log("Email sent"));
        }))
            .catch((error) => {
            res.json(error);
        });
    }
    catch (error) {
        res.json(error);
    }
}));
messageRouter.get('/message', userAuth_1.userAuth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield message_1.default.aggregate([
            {
                $group: {
                    _id: '$email',
                    latestDate: { $max: '$time' },
                    message: {
                        $push: {
                            text: "$text",
                            sent: "$time"
                        }
                    }
                }
            },
            {
                $sort: { latestDate: -1 }
            }
        ]);
        const data = result.map(element => ({
            Sender: element._id,
            message: element.message.reverse()
        }));
        res.json(data);
    }
    catch (error) {
        res.json(error);
    }
}));
messageRouter.delete('/deletemessage', userAuth_1.userAuth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield message_1.default.findByIdAndDelete(req.body.messageId)
            .then(deleted => {
            if (deleted === null) {
                res.json({ message: "message not found" });
            }
            else {
                res.json({ message: `message  '${deleted.text}'  deleted` });
            }
        })
            .catch(error => {
            res.json(error.message);
        });
    }
    catch (error) {
        res.json(error);
    }
}));
exports.default = messageRouter;
