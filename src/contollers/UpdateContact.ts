import mongoose from 'mongoose'
import User from '../models/userModel'
import { Icontact } from './FindLinkedContacts'


export const UpdateContact = async (contact: Icontact[]): Promise<void> => {
    const PrimaryContactId = contact[0]._id
    const updateContactId = contact[1]._id
    await User.updateOne({ _id: updateContactId }, { linkPrecedence: 'primary' }, (err: any, doc: any) => {
        if (err) {
            throw new Error('contact update filed')
        } else {
            console.log('contcat updated');
        }
    })
}