import mongoose from 'mongoose';

const volunteerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
    lowercase: true
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    trim: true
  },
  dateOfBirth: {
    type: Date,
    required: [true, 'Date of birth is required']
  },
  skills: {
    type: [String],
    required: [true, 'Skills are required']
  },
  interests: {
    type: [String],
    required: [true, 'Interests are required']
  },
  availability: {
    type: String,
    required: [true, 'Availability is required']
  },
  experience: {
    type: String,
    required: [true, 'Experience is required']
  },
  motivation: {
    type: String,
    required: [true, 'Motivation is required']
  },
  isApproved: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Create the model if it doesn't exist, otherwise use the existing one
const Volunteer = mongoose.models.Volunteer || mongoose.model('Volunteer', volunteerSchema);

export default Volunteer; 