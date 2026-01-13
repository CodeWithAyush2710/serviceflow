import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
    name: string;
    mobile: string;
    role: 'customer' | 'provider' | 'admin';
    location?: {
        lat: number;
        lng: number;
        address?: string;
    };
    skills?: string[]; // For providers: ['mason', 'helper']
    ratings: {
        average: number;
        count: number;
    };
    walletBalance: number;
    createdAt: Date;
}

const UserSchema: Schema = new Schema({
    name: { type: String, required: true },
    mobile: { type: String, required: true, unique: true },
    role: { type: String, enum: ['customer', 'provider', 'admin'], default: 'customer' },
    location: {
        lat: { type: Number },
        lng: { type: Number },
        address: { type: String },
    },
    skills: { type: [String], default: [] },
    ratings: {
        average: { type: Number, default: 0 },
        count: { type: Number, default: 0 },
    },
    walletBalance: { type: Number, default: 0 },
}, { timestamps: true });

// Prevent generic "OverwriteModelError" during hot reloads
export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
