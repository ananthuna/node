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
const express_1 = require("express");
const FindLinkedContacts_1 = require("../contollers/FindLinkedContacts");
const userModel_1 = __importDefault(require("../models/userModel"));
// import { Icontact } from '../contollers/FindLinkedContacts'
const CreateContact_1 = require("../contollers/CreateContact");
const getResponse_1 = require("../contollers/getResponse");
// import { getPrimaryContact } from '../contollers/getPrimaryContact'
const router = (0, express_1.Router)();
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = {
        phoneNumber: req.body.phoneNumber,
        email: req.body.email
    };
    try {
        const ContactByEmailAndPhone = yield (0, FindLinkedContacts_1.FindLinkedContacts)(user);
        const PrimaryContact = ContactByEmailAndPhone === null || ContactByEmailAndPhone === void 0 ? void 0 : ContactByEmailAndPhone.find(item => item.linkPrecedence === "primary");
        const isContactExist = ContactByEmailAndPhone === null || ContactByEmailAndPhone === void 0 ? void 0 : ContactByEmailAndPhone.find(item => item.email === user.email && item.phoneNumber === user.phoneNumber);
        const arg = Object.assign(Object.assign({}, user), { linkedId: PrimaryContact ? PrimaryContact._id : null, linkPrecedence: PrimaryContact ? "secondary" : "primary", deletedAt: null });
        if (!isContactExist) {
            (0, CreateContact_1.CreateContact)(arg);
        }
        const ContactArray = [...yield userModel_1.default.find({ linkedId: PrimaryContact === null || PrimaryContact === void 0 ? void 0 : PrimaryContact._id }), PrimaryContact];
        const contact = (0, getResponse_1.getResponse)([...ContactArray]);
        res.status(200).json({ contact });
    }
    catch (error) {
        console.log(error.message);
        res.status(404).json({ message: error.message });
    }
}));
exports.default = router;
