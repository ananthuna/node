"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    phoneNumber: {
        type: String,
    },
    email: {
        type: String
    },
    linkedId: {
        type: mongoose_1.default.Schema.Types.ObjectId || null
    },
    linkPrecedence: {
        type: String
    },
    deletedAt: {
        type: Date
    }
}, {
    timestamps: true
});
// export default mongoose.model<UserTypeModel>("User", userSchema)
const User = mongoose_1.default.model("User", userSchema);
exports.default = User;
