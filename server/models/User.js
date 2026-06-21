import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
}, { timestamps: true });

// compare password
UserSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.password); // use async compare
};

const User = mongoose.model("User", UserSchema);
export default User;
