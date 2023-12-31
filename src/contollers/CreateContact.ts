import User from '../models/userModel'
import mongoose from 'mongoose'
import { Icontact } from './FindLinkedContacts'

export interface UserProps {
    phoneNumber?: String
    email?: String
    linkedId?: mongoose.Schema.Types.ObjectId | null
    linkPrecedence: String
    deletedAt?: Date | null
}

export interface PropsType {
    email: String
    phoneNumber: String
    PrimaryContactId: mongoose.Schema.Types.ObjectId | null
}

export const CreateContact = async (Contact: PropsType): Promise<Icontact> => {

    const arg: UserProps = {
        phoneNumber: Contact.phoneNumber,
        email: Contact.email,
        linkedId: Contact.PrimaryContactId || null,
        linkPrecedence: Contact.PrimaryContactId ? "secondary" : "primary",
        deletedAt: null
    }
    const user = new User(arg)
    user.save()
    return user
}   