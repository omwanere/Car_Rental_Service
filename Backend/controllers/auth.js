import { User } from "../models/User.Model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { FirstName, LastName, email, password } = req.body;
    if (!FirstName || !LastName || !email || !password) {
      return res.status(401).json({
        message: "Soemthing is missing, please check!",
        success: false,
      });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res.status(401).json({
        message: "User already exists",
        success: false,
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    // await User.create({
    //   FirstName,
    //   LastName,
    //   email,
    //   password: hashedPassword,
    // });
    const newUser = await User.create({
      FirstName,
      LastName,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign({ userId: newUser._id }, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    const sanitizedUser = {
      _id: newUser._id,
      FirstName: newUser.FirstName,
      LastName: newUser.LastName,
      email: newUser.email,
    };
    return res.status(201).json({
      message: "Account created successfully",
      success: true,
      user: sanitizedUser,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something went wrong during signup.",
      error: error.message,
      success: false,
    });
  }
};

// export const login = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     if (!email || !password) {
//       return res.status(401).json({
//         message: "Something is missing, please check!",
//         success: false,
//       });
//     }
//     let user = await User.findOne({ email });
//     if (!user) {
//       return res.status(401).json({
//         message: "Incorrect email or password",
//         success: false,
//       });
//     }
//     const isPasswordMatch = await bcrypt.compare(password, user.password);
//     if (!isPasswordMatch) {
//       return res.status(401).json({
//         message: "Incorrect email or password",
//         success: false,
//       });
//     }
//     const token = await jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
//       expiresIn: "1d",
//     });

//     user = {
//       _id: user._id,
//       FirstName: user.FirstName,
//       LastName: user.LastName,
//       email: user.email,
//     };
//     return res
//       .cookie("token", token, {
//         httpOnly: true,
//         sameSite: "strict",
//         maxAge: 1 * 24 * 60 * 60 * 1000,
//       })
//       .json({
//         message: `Welcome back ${user.FirstName} ${user.LastName}`,
//         success: true,
//         user,
//       });
//   } catch (error) {
//     console.log(error);
//   }
// };

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Something is missing, please check!",
        success: false,
      });
    }

    let user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        message: "Incorrect email or password",
        success: false,
      });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).json({
        message: "Incorrect email or password",
        success: false,
      });
    }

    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    const sanitizedUser = {
      _id: user._id,
      FirstName: user.FirstName,
      LastName: user.LastName,
      email: user.email,
    };

    return res
      .cookie("token", token, {
        httpOnly: true,
        sameSite: "strict",
        maxAge: 24 * 60 * 60 * 1000, // 1 day
      })
      .json({
        message: `Welcome back ${sanitizedUser.FirstName} ${sanitizedUser.LastName}`,
        success: true,
        user: sanitizedUser,
        token, // Send token to frontend so it can store it in localStorage
      });
  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({
      message: "Something went wrong during login.",
      error: error.message,
      success: false,
    });
  }
};
