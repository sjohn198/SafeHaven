import mongoose from "mongoose";
import ProfilePicture from "./profile-picture.js";

const UserSchema = new mongoose.Schema(
  {
    email: {
        type: String,
        required: true,
        trim: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    bio: {
      type: String,
      required: true,
      trim: true,
    },
    skills: {
      type: [String],
      required: true,
      trim: true,
    },
    profilePicture: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ProfilePicture',
    },
  },
  { collection: "users" }
);

const Users = mongoose.model("User", UserSchema);

export default Users;
