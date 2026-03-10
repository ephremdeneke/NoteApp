import bcrypt from "bcryptjs"; // for hashing passwords
import jwt from "jsonwebtoken"; // for creating and verifying tokens
import User from "../models/User.js";

const JWT_SECRET = process.env.JWT_SECRET || "dev_secret_change_me"; // secret key for signing tokens
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "1h"; // expiration time for tokens

export async function register(req, res) {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ message: "Username, email and password are required" });
    }

    const existingByEmail = await User.findOne({ email });
    if (existingByEmail) {
      return res.status(409).json({ message: "Email is already registered" });
    }

    const existingByUsername = await User.findOne({ username });
    if (existingByUsername) {
      return res.status(409).json({ message: "Username is already taken" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    return res
      .status(201)
      .json({
        message: "User registered successfully",
        user: { id: user._id, username: user.username, email: user.email },
      });
  } catch (error) {
    console.error("Error registering user:", error);
    return res.status(500).json({ message: "Server error while registering" });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });

    return res.status(200).json({
      token,
      user: { id: user._id, username: user.username, email: user.email },
    });
  } catch (error) {
    console.error("Error logging in:", error);
    return res.status(500).json({ message: "Server error while logging in" });
  }
}
