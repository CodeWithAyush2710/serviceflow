import mongoose, { Schema, Document } from 'mongoose';

export interface IService extends Document {
    type: 'Laborer' | 'Halwai' | 'Barber';
    title: string;
    description: string;
    price: number;
    pricingModel: 'per_day' | 'per_shift' | 'per_visit' | 'monthly';
    imageUrl?: string;
}

const ServiceSchema: Schema = new Schema({
    type: { type: String, enum: ['Laborer', 'Halwai', 'Barber'], required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    pricingModel: { type: String, enum: ['per_day', 'per_shift', 'per_visit', 'monthly'], required: true },
    imageUrl: { type: String },
}, { timestamps: true });

export default mongoose.models.Service || mongoose.model<IService>('Service', ServiceSchema);
