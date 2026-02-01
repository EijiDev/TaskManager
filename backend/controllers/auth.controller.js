import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Users from "../model/users.model.js";

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const findUser = await Users.findUserByEmail(email);

    console.log("findUser:", findUser);

    if (!findUser) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const match = await bcrypt.compare(password, findUser.password);

    if (!match) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // Generate token
    const accessToken = jwt.sign(
      {
        userId: findUser.id,
        email: findUser.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "15m" },
    );

    // Generate refresh token
    const refreshToken = jwt.sign(
      { userId: findUser.id },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: "7d" },
    );

    await Users.updateRefreshToken(findUser.id, refreshToken);

    // Set httpOnly cookie for refresh token
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      success: true,
      message: "Login successful",
      accessToken,
      user: {
        id: findUser.id,
        email: findUser.email,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred during login",
    });
  }
};

export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, email, and password are required",
      });
    }

    const existingUser = await Users.findUserByEmail(email);
    if (existingUser) {
        return res.status(409).json({
            success: false,
            message: "Email already exist"
        });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await Users.create({
        name,
        email,
        password: hashedPassword
    });

    res.status(201).json({
      success: true,
      message: "Successfully Created",
      data: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({
        success: false,
        message: "An error occured during signup"
    });
  }
};


