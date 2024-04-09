import { Request, Response } from "express";
import { User } from "../entity/User";
import { hash } from "../helpers/bcrypt";
import bcrypt from "bcrypt";
import { signJWT } from "../helpers/jwt";

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, username } = req.body;
    const userExists = await User.findOneBy({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await hash(password);
    const user = User.create({
      username,
      email,
      password: hashedPassword
    });
    await user.save();
    return res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOneBy({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    const status = await bcrypt.compare(password, user.password);
    if (!status) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    return res.status(200).json({
      message: "User Logged In successfully",
      access_token: signJWT({
        id: user.id,
        email: user.email,
        role: user.role
      })
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
