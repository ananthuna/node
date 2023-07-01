import { Icontact } from "./FindLinkedContacts"
import mongoose from "mongoose"
import { UpdateContact } from "./UpdateContact"

export interface ReturnType {
    primaryContatctId: mongoose.Schema.Types.ObjectId | null
    emails: String[]
    phoneNumbers: String[]
    secondaryContactIds: mongoose.Schema.Types.ObjectId[]
}

export const getResponse = (array: Icontact[]) => {
    const emails: any[] = []
    const phoneNumbers: any[] = []
    const secondaryContactIds: any[] = []
    let primaryContatctId: mongoose.Schema.Types.ObjectId | null = null

    array.map((contact, index) => {
        contact.email && emails.push(contact.email)
        contact.phoneNumber && phoneNumbers.push(contact.phoneNumber)
        if (contact.linkPrecedence === 'secondary') secondaryContactIds.push(contact._id)
        if (contact.linkPrecedence === 'primary') {
            if (!primaryContatctId) {
                primaryContatctId = contact._id
            }
        }
    })



    return {
        primaryContatctId,
        emails: [...new Set(emails)],
        phoneNumbers: [...new Set(phoneNumbers)],
        secondaryContactIds: [...new Set(secondaryContactIds)]
    }


}