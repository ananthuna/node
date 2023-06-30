"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateContact = void 0;
const userModel_1 = __importDefault(require("../models/userModel"));
const CreateContact = (userProps) => {
    const user = new userModel_1.default(userProps);
    user.save();
};
exports.CreateContact = CreateContact;
