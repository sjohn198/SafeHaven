import mongoose from "mongoose";
import UserModel from "../models/user.js";
import ProfilePictureModel from "../models/profile-picture.js";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config();
const uri = process.env.MONGODB_URI;
import jwt from "jsonwebtoken"; 


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

function getUsers(username, name, profilePicture) {
  let query = {};
  if (username) {
    query.username = username;
  }
  if (name) {
    query.name = name;
  }
  if (profilePicture) {
    query.profilePicture = profilePicture;
  }
  return UserModel.find(query);
}

function getPassword(username) { //same as get Users but uses findOne
  let query = {};
  query.username = username;
  return UserModel.findOne(query, {password: 1});
}

function generateAccessToken(username) { 
  return new Promise((resolve, reject) => { 
    jwt.sign( 
      { username: username }, 
      process.env.TOKEN_SECRET, 
      { expiresIn: "1d" }, 
      (error, token) => { 
        if (error) reject(error); 
        else resolve(token); 
      } 
    ); 
  }); 
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
  getPassword,
  generateAccessToken,
  findUserById,
  findProfilePictureById,
  uploadProfilePicture,
  changeUserProfilePicture,
};
