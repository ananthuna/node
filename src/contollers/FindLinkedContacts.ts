import User from '../models/userModel'
import mongoose from 'mongoose'

export interface PropsType {
    email?: String
    phoneNumber?: String
}

export interface Icontact {
    _id: mongoose.Schema.Types.ObjectId
    phoneNumber?: String
    email?: String
    linkedId?: mongoose.Schema.Types.ObjectId | null
    linkPrecedence: "secondary" | "primary"
    createdAt: Date
    updatedAt: Date
    deletedAt?: Date | null
}

export interface IContacts {
    ContactsByEmail?: Icontact[]
    ContactsByPhone?: Icontact[]
    ContactByEmailAndPhone?: Icontact[]
}

export const FindLinkedContacts = async (props: PropsType): Promise<Icontact[]> => {
    const { email, phoneNumber } = props
    const AllContacts = await User.find({})
    const ContactByEmailAndPhone: Icontact[] | undefined = []

    AllContacts.forEach((contact) => {

        if (contact.email === email || contact.phoneNumber === phoneNumber) {

            ContactByEmailAndPhone.push(contact)
        }
    })
    
    return ContactByEmailAndPhone

}