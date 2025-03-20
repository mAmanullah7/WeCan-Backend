import mongoose, { Schema, Document } from 'mongoose';

export interface IEvent extends Document {
  title: string;
  description: string;
  date: Date;
  location: string;
  year: number;
  category: 'sports' | 'cultural' | 'other';
  images?: string[];
  organizers?: string[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const EventSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide a title'],
      trim: true,
      maxlength: [100, 'Title cannot be more than 100 characters'],
    },
    description: {
      type: String,
      required: [true, 'Please provide a description'],
      maxlength: [2000, 'Description cannot be more than 2000 characters'],
    },
    date: {
      type: Date,
      required: [true, 'Please provide a date'],
    },
    location: {
      type: String,
      required: [true, 'Please provide a location'],
      trim: true,
    },
    year: {
      type: Number,
      required: [true, 'Please provide a year'],
    },
    category: {
      type: String,
      enum: ['sports', 'cultural', 'other'],
      default: 'other',
    },
    images: {
      type: [String],
    },
    organizers: {
      type: [String],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

// Prevent mongoose from creating a new model if it already exists
const Event = mongoose.models.Event || mongoose.model<IEvent>('Event', EventSchema);

export default Event; 