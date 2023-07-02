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
exports.getPrimaryContacts = void 0;
const userModel_1 = __importDefault(require("../models/userModel"));
const getPrimaryContacts = (array) => __awaiter(void 0, void 0, void 0, function* () {
    const PrimaryContacts = [];
    const linkedIds = [...new Set(array.map(item => item === null || item === void 0 ? void 0 : item.linkedId))];
    if (!linkedIds[0]) {
        return array.filter(item => item.linkPrecedence === 'primary');
    }
    for (let i in linkedIds) {
        const contact = yield userModel_1.default.findOne({ _id: linkedIds[i] });
        contact && PrimaryContacts.push(contact);
    }
    return PrimaryContacts;
});
exports.getPrimaryContacts = getPrimaryContacts;
