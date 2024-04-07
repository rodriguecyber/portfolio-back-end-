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
const globals_1 = require("@jest/globals");
const supertest_1 = __importDefault(require("supertest"));
const index_1 = __importDefault(require("../index"));
const mongoose_1 = __importDefault(require("mongoose"));
describe('testing message routes', () => {
    (0, globals_1.beforeAll)(() => __awaiter(void 0, void 0, void 0, function* () {
        yield mongoose_1.default.connect('mongodb+srv://user1:user1@cluster0.q3w70mq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
    }));
    (0, globals_1.afterAll)(() => __awaiter(void 0, void 0, void 0, function* () {
        yield mongoose_1.default.connection.close();
        yield mongoose_1.default.disconnect();
    }));
    describe('post/brand/sendmessage', () => {
        (0, globals_1.test)('should send message', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(index_1.default)
                .post('/brand/Sendmessage');
            (0, globals_1.expect)(response.status).toBe(200);
        }), 20000);
    });
    describe('get/brand/message', () => {
        (0, globals_1.test)('should display message ', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(index_1.default)
                .get('/brand/message');
            (0, globals_1.expect)(response.status).toBe(200);
        }), 20000);
    });
    describe('get/brand/deletemessage', () => {
        (0, globals_1.test)('should display message ', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(index_1.default)
                .delete('/brand/deletemessage/:id');
            (0, globals_1.expect)(response.status).toBe(200);
        }), 20000);
    });
});
// testing message routes
