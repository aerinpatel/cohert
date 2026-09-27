import mongoose, { Document, Schema } from 'mongoose';

export interface IRoom extends Document {
    roomId: string;
    name?: string;
    createdBy: string;
    createdAt: Date;
}

const roomSchema = new Schema<IRoom>({
    roomId: {
        type: String,
        required: true,
        unique: true,
        uppercase: true,
        trim: true,
    },
    name: {
        type: String,
        default: '',
    },
    createdBy: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export const Room = mongoose.model<IRoom>('Room', roomSchema);
