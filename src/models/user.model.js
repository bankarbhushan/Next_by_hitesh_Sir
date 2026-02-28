import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: [true, 'Username is required.'],
    unique: true
  },
  email: {
    type: String,
    required: [true, 'email is required.'],
    unique: true
  },
  password: {
    type: String,
    required: [true, 'Password is required.']
  },
  resetPasswordToken: {
    type: String
  },
  resetPasswordExpiry: {
    type: Date
  },
  isverified: {
    type: Boolean,
    default: false
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  forgotPasswordToken: String,
  forgotPasswordTokenExpiry: Date,
  verifyToken: String,
  verifyTokenExpiry: Date
});

const User = mongoose.models.users || mongoose.model('users', userSchema);

export default User;
