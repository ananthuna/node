import User from '../models/userModel'
import mongoose from 'mongoose'

export interface UserProps {
    phoneNumber?: String
    email?: String
    linkedId?: mongoose.Schema.Types.ObjectId | null
    linkPrecedence: String
    deletedAt?: Date | null
}

export const CreateContact = (userProps: UserProps): void => {
    const user = new User(userProps)
    user.save()
    console.log('create');
    
}