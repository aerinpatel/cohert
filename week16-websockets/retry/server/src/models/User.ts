import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
    username: string;
    passwordHash: string;
    salt: string;
    refreshToken: string | null;
    createdAt: Date;
}

const userSchema = new Schema<IUser>({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3,
    },
    passwordHash: {
        type: String,
        required: true,
    },
    salt: {
        type: String,
        required: true,
    },
    refreshToken: {
        type: String,
        default: null,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export const User = mongoose.model<IUser>('User', userSchema);
