import connect from "@/src/db/dbConfig";
import User from "../../../../models/user.model"
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    console.log(reqBody);

    const { email, password } = reqBody;

    if (email.length < 0 || password.length < 0) {
      return NextResponse.json({ message: "Enter and valid credentials" });
    }

    if (!email || !password) {
      return NextResponse.json({
        message: "All fields are required.",
        status: 500,
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({ message: "Invalid Credentials" });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return NextResponse.json({ message: "Invalid Password" });
    }

    const tokenData = {
      id: user._id,
      userName: user.userName,
      email: user.email,
    };

    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: "1d",
    });
    const response = NextResponse.json({
      message: "Login Successfull...",
      success: true,
    });

    response.cookies.set("token", token, { httpOnly: true });
    console.log(response);

    return response;
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Something went wrong.", status: 500 });
  }
}
