import connect from '@/src/db/dbConfig';
import User from '../../../../models/user.model';
import {NextRequest, NextResponse} from 'next/server';
import bcryptjs from 'bcryptjs';
import { sendEmail } from '@/src/helper/mailer';
connect();
export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const {userName, email, password} = reqBody;
    console.log(reqBody);

    const isExistingUser = await User.findOne({email});

    if (isExistingUser) {
      return NextResponse.json({
        error: 'User already exist.',
        statusCode: 400
      });
    }

    // hash Password
    const salt = await bcryptjs.genSalt(10);
    const hashPassword = await bcryptjs.hash(password, salt);

    // save the user in the database
    const newUser = new User({
      userName,
      email,
      password: hashPassword
    });

    const saveUser = await newUser.save();
    console.log(newUser);
    // send verification email
    await sendEmail({email, emailType: 'VERIFY', userId: saveUser._id});
    return NextResponse.json({
      Message: 'User Created successfully',
      success: true,
      User: saveUser,
      status: 200
    });
  } catch (error) {
    return NextResponse.json({error: error, statusCode: 500});
  }
}
