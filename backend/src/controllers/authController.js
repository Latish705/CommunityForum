import { User } from "../models/userModel.js";
import { hashPassword } from "../utils/authUtils.js";
import { uploadToCloudinary } from "../utils/cloudinary.js";

export const register = async (req, res) => {
  const { username, email, password } = req.body;

  // Check if any of the required fields is missing
  if (!username || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Check if a user already exists with the given email
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return res.status(200).send({
      success: false,
      message: "User already exists with this email",
    });
  }

  //upload user's avatar to cloudinary

  let avatarLocalPath;
  if (
    req.files &&
    Array.isArray(req.files.avatar) &&
    req.files.avatar.length > 0
  ) {
    avatarLocalPath = req.files.avatar[0].path;
  }

  try {
    // Upload avatar to Cloudinary and get the URL
    const userAvatar = await uploadToCloudinary(avatarLocalPath);

    // Check if avatar upload was successful
    if (!userAvatar) {
      return res.status(500).send({
        success: false,
        message: "Error uploading avatar",
      });
    }

    // Hash the password
    const hashedPassword = await hashPassword(password);

    // Create a new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      avatar: userAvatar.url,
    });

    // Save the new user to the database
    await newUser.save();

    console.log("User created successfully");
    res.status(201).send({
      success: true,
      message: "User created successfully",
      username,
      email,
      avatar: userAvatar.url,
    });
  } catch (error) {
    console.error("Error creating user", error);
    res.status(500).send({
      success: false,
      message: "Error creating user",
      error: error.message,
    });
  }
};
