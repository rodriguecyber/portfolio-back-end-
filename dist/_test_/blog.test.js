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
//  testing blog routes
describe('testing blog routes', () => {
    (0, globals_1.beforeAll)(() => __awaiter(void 0, void 0, void 0, function* () {
        yield mongoose_1.default.connect('mongodb+srv://user1:user1@cluster0.q3w70mq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
    }), 20000);
    (0, globals_1.afterAll)(() => __awaiter(void 0, void 0, void 0, function* () {
        yield mongoose_1.default.connection.close();
        yield mongoose_1.default.disconnect();
    }));
    describe('GET /api/brand/blog', () => {
        (0, globals_1.test)('should get all blogs', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(index_1.default)
                .get('/brand/blogs');
            (0, globals_1.expect)(response.status).toBe(200);
        }), 20000);
    });
    describe('post/brand/addBlogs', () => {
        (0, globals_1.test)('should post  blogs', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(index_1.default)
                .post('/brand/addblog');
            (0, globals_1.expect)(response.status).toBe(200);
        }), 20000);
    });
    describe('post/brand/comment', () => {
        (0, globals_1.test)('should post  comment', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(index_1.default)
                .post('/brand/comment/:id');
            (0, globals_1.expect)(response.status).toBe(200);
        }), 20000);
    });
    describe('patch/brand/blog', () => {
        (0, globals_1.test)('should update  blog', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(index_1.default)
                .patch('/brand/updateBlog/:id}')
                .send();
            (0, globals_1.expect)(response.status).toBe(200);
        }), 20000);
    });
    describe('patch/brand/like', () => {
        (0, globals_1.test)('should like  blog', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(index_1.default)
                .patch('/brand/like/6605abd6ef7db60a1704dd1a');
            (0, globals_1.expect)(response.status).toBe(200);
        }), 20000);
    });
    describe('delete/brand/deleteblog', () => {
        (0, globals_1.test)('should delete blog', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(index_1.default)
                .delete('/brand/deleteblog/:id');
            (0, globals_1.expect)(response.status).toBe(200);
        }), 20000);
    });
});
