import User from '../models/userModel'
import { Icontact } from './FindLinkedContacts'


export const UpdateContact = async (contact: Icontact[]): Promise<void> => {
    const PrimaryContactId = contact[0]._id
    const updateContactId = contact[1]._id
    await User.findOneAndUpdate({ _id: updateContactId }, { linkPrecedence: 'secondary', linkedId: PrimaryContactId }, { new: true })
    await User.updateMany({ linkedId: updateContactId }, { linkedId: PrimaryContactId })
}