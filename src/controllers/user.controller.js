import {asyncHandler} from '../utils/asyncHandler.js';
import {ApiError} from '../utils/ApiError.js'
import {User} from '../models/user.model.js'
import {uploadOnCloudinary} from '../utils/cloudnary.js'
import { ApiResponse } from '../utils/ApiResponse.js';

const registerUser = asyncHandler(async (req,res) =>{
       //get user details from frontend
       //validation -  not empty
       //check if user already exists: username, email
       //check for images , check for avatar
       //upload them to clodinary , avatar
       //create  user object - create entry in db
       //remove password and refresh token flield from response 
       //check for user creation 
       //return response 
       
       const {fullName,email,userName,password} = req.body;
       console.log("email:",email);
       
       if (
              [fullName,email,userName,password].some((field) => field?.trim() === "")
       ) {
              throw new  ApiError(400,"all failds are required")
       }
       const existedUser = User.findOne({
              $or:[{ userName },{ email }]
       })
       if (existedUser) {
              throw new ApiError(409,"user with email or username already exists")
       }
       const avatarLocalPath =  req.files?.avatar[0]?.path;
       const coverImageLocalPath = req.files?.coverImage[0]?.path;

       if (!avatarLocalPath) {
              throw ApiError(400,"Avatar file is required")
       }

       const avatar =  await  uploadOnCloudinary(avatarLocalPath)
       const coverImage =  await uploadOnCloudinary(coverImageLocalPath)

       if(!avatar){
              throw ApiError(400,"Avatar file is required")
       }


       const user =   await User.create({
           fullName,
           avatar:avatar.url,
           coverImage:coverImage?.url || "",
           email,
           password,
           username: username.toLowerCase()
       })
       const createdUser = await User.findById(user._id).select(
              "-password  -refreshToken"
       )
       if (!createdUser) {
           throw new ApiError(500,"somthing went wrong while  registering  the user")   
       }

       return res.status(201).json(
              new  ApiRespons(200,createdUser , "user registerd  successfully ")
       )
           
       })




export {registerUser}