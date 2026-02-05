import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true, // Ensures no two users have the same name
  },
  password: {
    type: String,
    required: true,
  },
});

export default mongoose.model("User", userSchema);
