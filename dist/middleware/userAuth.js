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
exports.authorize = exports.userAuth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const rolers_1 = __importDefault(require("../models/rolers"));
const userAuth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET, (err, decoded) => __awaiter(void 0, void 0, void 0, function* () {
        if (err) {
            if (err.message === 'jwt expired') {
                res.json({ message: 'token has expired! login again' });
            }
            else {
                res.json({ message: "please login" });
            }
        }
        else {
            req.user = decoded;
            next();
        }
    }));
});
exports.userAuth = userAuth;
const authorize = (role, permission) => {
    return (req, res, next) => {
        const userRole = req.user.role;
        if (userRole !== role) {
            return res.json(`you are not ${role}`);
        }
        if (!rolers_1.default[userRole].includes(permission)) {
            res.json(`in your role '${userRole}' permission to ${userRole} is not included`);
        }
        else {
            next();
        }
    };
};
exports.authorize = authorize;
