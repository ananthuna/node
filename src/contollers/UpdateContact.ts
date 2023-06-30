import mongoose from 'mongoose'
import User from '../models/userModel'


export const UpdateContact = async (id: mongoose.Schema.Types.ObjectId): Promise<void> => {
    const user = await User.findOne({ _id: id })
    await User.findOneAndDelete({ _id: id })
}