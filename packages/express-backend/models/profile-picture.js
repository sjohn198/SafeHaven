import mongoose from "mongoose";

const profilePictureSchema = new mongoose.Schema({
  data: {
    type: Buffer,
    required: true,
    trim: true
  },
  contentType: {
    type: String,
    required: true,
    trim: true
  }
});

const ProfilePicture = mongoose.model("ProfilePicture", profilePictureSchema);

export default ProfilePicture;
