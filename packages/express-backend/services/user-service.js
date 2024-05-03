import mongoose from "mongoose";
import UserModel from "../models/user.js";
import ProfilePictureModel from "../models/profile-picture.js";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config();
const uri = process.env.MONGODB_URI;

mongoose.set("debug", true);

mongoose
  .connect(uri)
  .catch((error) => console.log(error));


const uploadProfilePicture = async (file) => {
    try {
        if (!file) {
            throw new Error("No file uploaded");
        }
        
        const data = fs.readFileSync(file.path);
        const profilePicture = new ProfilePictureModel({
            data: data,
            contentType: file.mimetype,
        });

        return await profilePicture.save();
    } catch (error) {
        console.error(error);
        throw error;
    }
}

function getUsers(email, name, profilePicture) {
  let query = {};
  if (email) {
    query.email = email;
  }
  if (name) {
    query.name = name;
  }
  if (profilePicture) {
    query.profilePicture = profilePicture;
  }
  return UserModel.find(query);
}

function changeUserProfilePicture(id, profilePictureId) {
    return UserModel.findByIdAndUpdate(
        id,
        { profilePicture: profilePictureId },
        { new: true }
      ).exec();}

    
function findUserById(id) {
  return UserModel.findById(id);
}

function findProfilePictureById(id) {
    return ProfilePictureModel.findById(id);
}
  
function removeUser(id) {
  return UserModel.findByIdAndDelete(id);
}

function addUser(user) {
    const userToAdd = new UserModel(user);
    const promise = userToAdd.save();
    return promise;
  }
  

export default {
  addUser,
  removeUser,
  getUsers,
  findUserById,
  findProfilePictureById,
  uploadProfilePicture,
  changeUserProfilePicture,
};
