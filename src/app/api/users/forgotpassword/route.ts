import { NextRequest, NextResponse } from "next/server";
import User from "@/src/models/user.model";
import { sendEmail } from "../../../../helper/mailer";

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { message: "Email not found" },
        { status: 400 }
      );
    }

    await sendEmail({
      email,
      emailType: "RESET",
      userId: user._id
    });

    return NextResponse.json({
      message: "Reset link sent to your email"
    });

  } catch (error: any) {
    return NextResponse.json(
      { message: error.message },
      { status: 500 }
    );
  }
}