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
const messageRouter = (0, express_1.default)();
messageRouter.post('/Message', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const message = new message_1.default({
        name: req.body.name,
        email: req.body.email,
        text: req.body.text,
        time: Date.now(),
    });
    yield message.save()
        .then((result) => {
        res.json({ message: `${result.name} sent ${result.text} at${result.time} using ${result.email}` });
    })
        .catch((error) => {
        res.json(error);
    });
}));
messageRouter.get('/message', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield message_1.default.aggregate([
            {
                $group: {
                    _id: '$email',
                    message: {
                        $push: {
                            text: "$text",
                            sent: "$time"
                        }
                    }
                }
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
exports.default = messageRouter;
