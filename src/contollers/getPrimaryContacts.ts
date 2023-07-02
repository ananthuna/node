import User from "../models/userModel";
import { Icontact } from "./FindLinkedContacts";

export const getPrimaryContacts = async (array: Icontact[]): Promise<Icontact[]> => {

    const PrimaryContacts = []
    const linkedIds = [...new Set(array.map(item => item?.linkedId))]

    if (!linkedIds[0]) {
        return array.filter(item => item.linkPrecedence === 'primary')
    }

    for (let i in linkedIds) {
        const contact = await User.findOne({ _id: linkedIds[i] })
        contact && PrimaryContacts.push(contact)
    }

    return PrimaryContacts
}