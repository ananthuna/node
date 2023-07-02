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
exports.getResponse = void 0;
const userModel_1 = __importDefault(require("../models/userModel"));
const getResponse = (primaryContact) => __awaiter(void 0, void 0, void 0, function* () {
    const emails = [primaryContact === null || primaryContact === void 0 ? void 0 : primaryContact.email];
    const phoneNumbers = [primaryContact === null || primaryContact === void 0 ? void 0 : primaryContact.phoneNumber];
    const secondaryContactIds = [];
    const array = yield userModel_1.default.find({ linkedId: primaryContact === null || primaryContact === void 0 ? void 0 : primaryContact._id });
    (array === null || array === void 0 ? void 0 : array.length) > 0 && array.map((contact) => {
        contact.email && emails.push(contact.email);
        contact.phoneNumber && phoneNumbers.push(contact.phoneNumber);
        if (contact.linkPrecedence === 'secondary')
            secondaryContactIds.push(contact._id);
    });
    return {
        primaryContatctId: primaryContact === null || primaryContact === void 0 ? void 0 : primaryContact._id,
        emails: [...new Set(emails)],
        phoneNumbers: [...new Set(phoneNumbers)],
        secondaryContactIds: [...new Set(secondaryContactIds)]
    };
});
exports.getResponse = getResponse;
