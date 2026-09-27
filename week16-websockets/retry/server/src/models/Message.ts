import mongoose, { Document, Schema } from 'mongoose';

export interface IMessage extends Document {
    roomId: string;
    sender: string;
    content: string;
    createdAt: Date;
}

const messageSchema = new Schema<IMessage>({
    roomId: {
        type: String,
        required: true,
        index: true,
    },
    sender: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export const Message = mongoose.model<IMessage>('Message', messageSchema);
