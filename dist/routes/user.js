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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const FindLinkedContacts_1 = require("../contollers/FindLinkedContacts");
const CreateContact_1 = require("../contollers/CreateContact");
const getResponse_1 = require("../contollers/getResponse");
const getPrimaryContacts_1 = require("../contollers/getPrimaryContacts");
const UpdateContact_1 = require("../contollers/UpdateContact");
const router = (0, express_1.Router)();
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const user = {
        phoneNumber: req.body.phoneNumber,
        email: req.body.email
    };
    try {
        const ContactByEmailAndPhone = (yield (0, FindLinkedContacts_1.FindLinkedContacts)(user)) || [];
        let PrimaryContacts = yield (0, getPrimaryContacts_1.getPrimaryContacts)(ContactByEmailAndPhone);
        let isContactListUpdated = false;
        const isContactExist = ContactByEmailAndPhone.find((item) => item.email === user.email && item.phoneNumber === user.phoneNumber);
        if ((PrimaryContacts === null || PrimaryContacts === void 0 ? void 0 : PrimaryContacts.length) > 1) {
            yield (0, UpdateContact_1.UpdateContact)(PrimaryContacts);
            isContactListUpdated = true;
        }
        else if ((ContactByEmailAndPhone === null || ContactByEmailAndPhone === void 0 ? void 0 : ContactByEmailAndPhone.length) === 0) {
            const userContact = yield (0, CreateContact_1.CreateContact)(Object.assign(Object.assign({}, user), { PrimaryContactId: null }));
            if (userContact.linkPrecedence === "primary")
                PrimaryContacts.push(userContact);
            isContactListUpdated = true;
        }
        else if ((ContactByEmailAndPhone === null || ContactByEmailAndPhone === void 0 ? void 0 : ContactByEmailAndPhone.length) > 0 && !isContactExist) {
            yield (0, CreateContact_1.CreateContact)(Object.assign(Object.assign({}, user), { PrimaryContactId: (_a = PrimaryContacts[0]) === null || _a === void 0 ? void 0 : _a._id }));
            isContactListUpdated = true;
        }
        const contact = yield (0, getResponse_1.getResponse)(PrimaryContacts[0]);
        res.status(200).json({ contact });
    }
    catch (error) {
        console.log(error.message);
        res.status(404).json({ message: error.message });
    }
}));
exports.default = router;
