// User model
import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    name: String,
    email: {
      type: String,
      unique: true,
      required: true,
    },
    username: {
      type: String,
      unique: true,
      required: true,
    },
    image: String,
    googleId: String,
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model('User', UserSchema);