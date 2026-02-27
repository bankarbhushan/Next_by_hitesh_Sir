import getDataFromToken from '@/src/helper/getDataFromToken';
import {NextRequest, NextResponse} from 'next/server';
import connect from '@/src/db/dbConfig';
import User from '@/src/models/user.model';

connect();
export async function GET(request: NextRequest) {
  try {
    // we are calling the helper function so basically that will extact the token
    // using the token we will be finding the user from the User Model.
    const userId = await getDataFromToken(request);
    const user = await User.findOne({_id: userId}).select('-password');

    return NextResponse.json({
      message: 'User found.',
      data: user
    });
  } catch (error: any) {
    return NextResponse.json({message: error.message}, {status: 400});
  }
}
