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
describe('post/brand/signup', () => {
    (0, globals_1.test)('should register new user ', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(index_1.default)
            .post('/brand/signup')
            .send({
            firstname: 'name',
            lastname: 'name',
            email: 'name',
            password: 'name',
        });
        (0, globals_1.expect)(response.status).toBe(200);
    }), 20000);
});
describe('post/brand/login', () => {
    (0, globals_1.test)('should let user login ', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(index_1.default)
            .post('/brand/login');
        (0, globals_1.expect)(response.status).toBe(200);
    }), 20000);
});
describe('post/brand/forgot-password', () => {
    (0, globals_1.test)('should let user create reset password token ', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(index_1.default)
            .post('/brand/forgot-password');
        (0, globals_1.expect)(response.status).toBe(200);
    }), 20000);
});
describe('post/brand/reset-password', () => {
    (0, globals_1.test)('should let user reset password  ', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(index_1.default)
            .post('/brand/reset-password')
            .send({
            token: "1",
            password: "newPassword",
        });
        (0, globals_1.expect)(response.status).toBe(200);
    }), 20000);
});
describe('get/brand/subscriber', () => {
    (0, globals_1.test)('should get subscribers ', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(index_1.default)
            .get('/brand/subscriber');
        (0, globals_1.expect)(response.status).toBe(200);
    }), 20000);
});
