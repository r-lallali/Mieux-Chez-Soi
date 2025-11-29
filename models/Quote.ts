import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IQuote extends Document {
    name: string;
    email: string;
    phone: string;
    city: string;
    message: string;
    createdAt: Date;
}

const QuoteSchema: Schema = new Schema({
    name: {
        type: String,
        required: [true, 'Le nom est requis'],
    },
    email: {
        type: String,
        required: [true, "L'email est requis"],
    },
    phone: {
        type: String,
        required: [true, 'Le téléphone est requis'],
    },
    city: {
        type: String,
        required: [true, 'La ville est requise'],
    },
    message: {
        type: String,
        required: [true, 'Le message est requis'],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Prevent OverwriteModelError upon hot reload
const Quote: Model<IQuote> = mongoose.models.Devis || mongoose.model<IQuote>('Devis', QuoteSchema);

export default Quote;
