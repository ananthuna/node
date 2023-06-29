import mongoose, { Schema, Document } from "mongoose";

export interface UserType {
    _id: mongoose.Schema.Types.ObjectId
    phoneNumber?: String
    email?: String
    linkedId?: mongoose.Schema.Types.ObjectId | null
    linkPrecedence: "secondary" | "primary"
    createdAt: Date
    updatedAt: Date
    deletedAt?: Date
}

export interface UserTypeModel extends UserType { }


const userSchema: Schema = new mongoose.Schema({
    phoneNumber: {
        type: String,
    },
    email: {
        type: String
    },
    linkedId: {
        type: mongoose.Schema.Types.ObjectId || null
    },
    linkPrecedence: {
        type: String
    },
    deletedAt: {
        type: Date
    }
},
    {
        timestamps: true
    })
// export default mongoose.model<UserTypeModel>("User", userSchema)
const User = mongoose.model<UserTypeModel>("User", userSchema)
export default User