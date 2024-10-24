import mongoose, { Schema, Document  } from "mongoose";

export interface IRefreshToken extends Document{
    token: string,
    user: Schema.Types.ObjectId,
    expiresAt: Date
}

const refreshTokenSchema: Schema = new Schema<IRefreshToken>({
    token: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        req: 'User',
        required: true
    },  
    expiresAt: {
        type: Date,
        required: true
    }
});

const RefreshToken = mongoose.model<IRefreshToken>('RefreshToken', refreshTokenSchema);

export default RefreshToken;