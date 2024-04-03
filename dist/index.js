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
const blogRouter_1 = __importDefault(require("./routes/blogRouter"));
const swaggerOptions_1 = __importDefault(require("./swagger/swaggerOptions"));
const bodyParser = require("body-parser");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(bodyParser.urlencoded({ extended: true }));
// Parse JSON bodies (as sent by API clients)
app.use(bodyParser.json());
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
app.use('/brand', userRoutes_1.default);
app.use('/brand', messageRouter_1.default);
app.use('/brand', blogRouter_1.default);
app.use('/api-doc', swaggerOptions_1.default);
exports.default = app;
