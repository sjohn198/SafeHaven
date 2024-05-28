import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true
    },
    password: {
      type: String,
      required: true,
      trim: true
    },
    name: {
      type: String,
      required: false,
      trim: true
    },
    location: {
      type: String,
      required: false,
      trim: true
    },
    bio: {
      type: String,
      required: false,
      trim: true
    },
    skills: {
      type: [String],
      required: false,
      trim: true
    },
    profilePicture: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProfilePicture"
    },
    products : {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "product"
    },
    orders : {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "order"
    }
  },
  { collection: "users" }
);

const Users = mongoose.model("User", UserSchema);

export default Users;
