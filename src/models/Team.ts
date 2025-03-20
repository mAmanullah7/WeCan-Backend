import mongoose, { Schema, Document } from 'mongoose';

export interface ITeamMember extends Document {
  name: string;
  position: string;
  year: number;
  department?: string;
  bio?: string;
  image?: string;
  socialLinks?: {
    linkedin?: string;
    twitter?: string;
    instagram?: string;
  };
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const TeamMemberSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a name'],
      trim: true,
    },
    position: {
      type: String,
      required: [true, 'Please provide a position'],
      trim: true,
    },
    year: {
      type: Number,
      required: [true, 'Please provide a year'],
    },
    department: {
      type: String,
      trim: true,
    },
    bio: {
      type: String,
      maxlength: [500, 'Bio cannot be more than 500 characters'],
    },
    image: {
      type: String,
    },
    socialLinks: {
      linkedin: String,
      twitter: String,
      instagram: String,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

// Prevent mongoose from creating a new model if it already exists
const TeamMember = mongoose.models.TeamMember || mongoose.model<ITeamMember>('TeamMember', TeamMemberSchema);

export default TeamMember; 