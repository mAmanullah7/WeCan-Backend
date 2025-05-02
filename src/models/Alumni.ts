import mongoose, { Schema, Document } from 'mongoose';

export interface IAlumni extends Document {
  userId: mongoose.Types.ObjectId;
  name: string;
  email: string;
  graduationYear: number;
  batch: string;
  position?: string;
  currentOrganization?: string;
  bio?: string;
  profilePicture?: string;
  socialLinks?: {
    linkedin?: string;
    twitter?: string;
    instagram?: string;
  };
  isApproved: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const AlumniSchema: Schema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: false,
    },
    name: {
      type: String,
      required: [true, 'Please provide a name'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Please provide an email'],
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        'Please provide a valid email',
      ],
      unique: true,
      lowercase: true,
      trim: true,
    },
    graduationYear: {
      type: Number,
      required: [true, 'Please provide graduation year'],
    },
    batch: {
      type: String,
      required: [true, 'Please provide batch information'],
    },
    position: {
      type: String,
    },
    currentOrganization: {
      type: String,
    },
    bio: {
      type: String,
      maxlength: [1000, 'Bio cannot be more than 1000 characters'],
    },
    profilePicture: {
      type: String,
      default: '/images/alumni/placeholder.jpg',
    },
    socialLinks: {
      linkedin: String,
      twitter: String,
      instagram: String,
    },
    isApproved: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// Prevent mongoose from creating a new model if it already exists
const Alumni = mongoose.models.Alumni || mongoose.model<IAlumni>('Alumni', AlumniSchema);

export default Alumni; 