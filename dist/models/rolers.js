"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const roles = {
    admin: ['read', 'delete', 'update', "create"],
    user: ['read', 'update']
};
exports.default = roles;
