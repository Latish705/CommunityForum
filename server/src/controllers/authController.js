import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import { User } from "../models/userModel.js";
import { uploadToCloudinary } from "../utils/cloudinary.js";

const generateAccessAndRefereshTokens = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while generating referesh and access token"
    );
  }
};
export const register = asyncHandler(async (req, res) => {
  try {
    // 1. checking fields
    // 2. checking does user exists
    // 3. upload avatar to cloudinary
    // 4. return res

    const { username, email, password } = req.body;
    console.log(username, email, password);

    if ([username, email, password].some((fields) => fields.trim() === "")) {
      throw new ApiError(400, "All fields are required");
    }

    const user = User.findOne({ email });
    if (!user) {
      throw new ApiError(400, "User already exists");
    }

    //uploading to cloudinary
    let localAvatarPath;
    if (
      req.files &&
      Array.isArray(req.files.avatar) &&
      req.files.avatar.length > 0
    ) {
      localAvatarPath = req.files.avatar[0].path;
    }

    const avatar = await uploadToCloudinary(localAvatarPath);
    if (!avatar) {
      throw new ApiError(400, "Failed to upload image");
    }

    const newUser = await User.create({
      username,
      password,
      email,
      avatar: avatar.url,
    });

    const registeredUser = await User.findById(newUser._id).select(
      "-password -refreshToken"
    );

    return res
      .status(201)
      .send(
        new ApiResponse(
          201,
          { user: registeredUser },
          "User register successfully"
        )
      );
  } catch (error) {
    console.log(error);
  }
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }); //never write select it will create problem while check correct
  if (!user) {
    throw new ApiError(400, "User doesn't exists please register first");
  }

  const isMatch = await user.isPasswordCorrect(password);
  if (!isMatch) {
    throw new ApiError(400, "Password doesn't match try again");
  }

  const { refreshToken, accessToken } = await generateAccessAndRefereshTokens(
    user._id
  );
  console.log("login", refreshToken, accessToken);

  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  const options = {
    httpOnly: true,
    secure: true, // Set to true if using HTTPS
    // Add any other desired options here
  };

  // Set the 'accessToken' cookie
  res.cookie("accessToken", accessToken, options);

  // Set the 'refreshToken' cookie
  res.cookie("refreshToken", refreshToken, options);

  // Send the response
  res
    .status(200)
    .send(
      new ApiResponse(
        200,
        { user: loggedInUser, accessToken, refreshToken },
        "User logged in Successfully"
      )
    );
});

export const logout = asyncHandler(async (req, res) => {
  try {
    // gonna clear refreshToken
    const user = await User.findByIdAndUpdate(
      req.user._id,
      {
        $unset: {
          refreshToken: 1,
        },
      },
      {
        new: true,
      }
    );

    const options = {
      httpOnly: true,
      secure: true,
    };
    return res
      .status(200)
      .clearCookie("refreshToken", options)
      .clearCookie("accessToken", options)
      .send(new ApiResponse(200, {}, "User logged out successfully"));
  } catch (error) {
    console.log(error);
  }
});
