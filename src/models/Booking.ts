import mongoose, { Schema, Document } from 'mongoose';

export interface IBooking extends Document {
    customer: mongoose.Types.ObjectId;
    provider?: mongoose.Types.ObjectId;
    serviceType: 'Laborer' | 'Halwai' | 'Barber';
    date: Date;
    status: 'pending' | 'confirmed' | 'completed' | 'cancelled' | 'disputed';
    amount: number;
    paymentStatus: 'pending' | 'paid';
    description?: string;
    address: string; /* job location */
}

const BookingSchema: Schema = new Schema({
    customer: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    provider: { type: Schema.Types.ObjectId, ref: 'User' },
    serviceType: { type: String, enum: ['Laborer', 'Halwai', 'Barber'], required: true },
    date: { type: Date, required: true },
    status: { type: String, enum: ['pending', 'confirmed', 'completed', 'cancelled', 'disputed'], default: 'pending' },
    amount: { type: Number, required: true },
    paymentStatus: { type: String, enum: ['pending', 'paid'], default: 'pending' },
    description: { type: String },
    address: { type: String, required: true },
}, { timestamps: true });

export default mongoose.models.Booking || mongoose.model<IBooking>('Booking', BookingSchema);
