import User from "../models/userModel"
import { Icontact } from "./FindLinkedContacts"
import mongoose from "mongoose"

export interface ReturnType {
    primaryContatctId: mongoose.Schema.Types.ObjectId | null
    emails: String[]
    phoneNumbers: String[]
    secondaryContactIds: mongoose.Schema.Types.ObjectId[]
}

export const getResponse = async (primaryContact: Icontact) => {

        const emails: any[] = [primaryContact?.email]
        const phoneNumbers: any[] = [primaryContact?.phoneNumber]
        const secondaryContactIds: any[] = []
        const array = await User.find({ linkedId: primaryContact?._id })
        array?.length > 0 && array.map((contact) => {
            contact.email && emails.push(contact.email)
            contact.phoneNumber && phoneNumbers.push(contact.phoneNumber)
            if (contact.linkPrecedence === 'secondary') secondaryContactIds.push(contact._id)
        })

        return {
            primaryContatctId: primaryContact?._id,
            emails: [...new Set(emails)],
            phoneNumbers: [...new Set(phoneNumbers)],
            secondaryContactIds: [...new Set(secondaryContactIds)]
        }
}