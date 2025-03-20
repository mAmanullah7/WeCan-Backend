import mongoose, { Schema, Document } from 'mongoose';

export interface IComment extends Document {
  userId: mongoose.Types.ObjectId;
  content: string;
  isApproved: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const CommentSchema: Schema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    content: {
      type: String,
      required: [true, 'Please provide content'],
      maxlength: [1000, 'Comment cannot be more than 1000 characters'],
    },
    isApproved: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// Prevent mongoose from creating a new model if it already exists
const Comment = mongoose.models.Comment || mongoose.model<IComment>('Comment', CommentSchema);

export default Comment; 