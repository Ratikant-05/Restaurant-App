import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'

const generateUserTokens = async (user_id) => {
  const user = await User.findById(user_id);
  const refreshToken = await user.generateRefreshToken();
  const accessToken = await user.generateAccessToken();
  user.refreshToken = refreshToken;
  await user.save();
  return { refreshToken, accessToken };
};

export const postSignUp = async (req, res, next) => {
  try {
    const { username, email, password, contact, address } = req.body;

    if (!username || !email || !password || !contact || !address) {
      return res.status(400).json({
        msg: "User details missing",
      });
    }

    const existingUser = await User.findOne({
      $or: [{ username }, { email }],
    });

    if (existingUser) {
      return res.status(400).json({
        msg: "user details already used",
      });
    }

    let newUser = await User.create({
      username,
      email,
      password,
      contact,
      address,
    });

    return res.status(200).json(newUser);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: error,
    });
  }
};

export const postLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        msg: "User details missing",
      });
    }

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res.status(400).json({ error: "User does not exist. Please Signup" });
    }

    const isMatch = await bcrypt.compare(password, existingUser.password);
    console.log(isMatch)

    if (!isMatch) {
      return res.status(400).json({
        msg: "Either Username or password not correct",
      });
    }

    const { accessToken, refreshToken } = await generateUserTokens(existingUser._id);
    const options = {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      path: "/",
    };

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json({
        message: `Successfully logged in ${existingUser.username}`,
        user: {
          id: existingUser._id,
          username: existingUser.username,
          email: existingUser.email,
        },
      });

  } catch (error) {
    return res.status(500).json({
      msg: "Internal Server Error",
    });
  }
};

export const postLogout = async (req, res, next) => {
  try {
    const { refreshToken } = req.cookies;

    const cookieOptions = {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    };

    if (!refreshToken) {
      res.clearCookie("refreshToken", cookieOptions);
      res.clearCookie("accessToken", cookieOptions);
      return res.status(400).json({ error: "No refresh token found" });
    }

    const user = await User.findOne({ refreshToken });

    if (!user) {
      res.clearCookie("refreshToken", cookieOptions);
      res.clearCookie("accessToken", cookieOptions);
      return res.status(400).json({ error: "Invalid token" });
    }

    user.refreshToken = null;
    await user.save();

    res.clearCookie("refreshToken", cookieOptions);
    res.clearCookie("accessToken", cookieOptions);

    return res.status(200).json({ message: "User logged out successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Internal Server Error",
    });
  }
};

export const getMe = async (req, res) => {
  try {
    const token = req.cookies?.accessToken;
    if (!token) {
      return res.status(401).json({ authenticated: false });
    }

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_KEY);

    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(401).json({ authenticated: false });
    }

    return res.status(200).json({
      authenticated: true,
      user,
    });
  } catch (error) {
    console.log("getMe error:", error.message);
    return res.status(401).json({ authenticated: false });
  }
};

export const postProfile = async (req,res) => {
  try {
    return res.status(200).json({msg: "your profile"})
  } catch (error) {
    console.log(error.message)
  }
}