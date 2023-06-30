"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getResponse = void 0;
const UpdateContact_1 = require("./UpdateContact");
const getResponse = (array) => {
    const emails = [];
    const phoneNumbers = [];
    const secondaryContactIds = [];
    let primaryContatctId = null;
    array.map((contact, index) => {
        contact.email && emails.push(contact.email);
        contact.phoneNumber && phoneNumbers.push(contact.phoneNumber);
        if (contact.linkPrecedence === 'secondary')
            secondaryContactIds.push(contact._id);
        if (contact.linkPrecedence === 'primary') {
            if (!primaryContatctId) {
                primaryContatctId = contact._id;
            }
            else {
                (0, UpdateContact_1.UpdateContact)(contact._id);
            }
        }
    });
    return {
        primaryContatctId,
        emails: [...new Set(emails)],
        phoneNumbers: [...new Set(phoneNumbers)],
        secondaryContactIds: [...new Set(secondaryContactIds)]
    };
};
exports.getResponse = getResponse;
