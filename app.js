"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const messageRouter_1 = __importDefault(require("./routes/messageRouter"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT;
const MONGODBURI = process.env.MONGOURI;
app.use(express_1.default.json());
mongoose_1.default.connect(MONGODBURI);
const db = mongoose_1.default.connection;
db.once('open', () => {
    console.log('database connected');
});
db.on('error', () => {
    console.log("Error in connecting to the database");
});
app.use(userRoutes_1.default);
app.use(messageRouter_1.default);
app.listen(PORT, () => {
    console.log(`app is running on ${PORT}`);
});
