import connect from '@/src/db/dbConfig';
import {NextResponse, NextRequest} from 'next/server';
import User from '../../../../models/user.model';
connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const {token} = reqBody;

    const user: any = User.findOne({
      verifyToken: token,
      verifyTokenExpiry: {$gt: Date.now()}
    });

    if (!user) {
      return NextResponse.json(
        {
          error: 'invalid token'
        },
        {
          status: 400
        }
      );
    }
    user.isVerified = true;
    user.verifyToken = undefined;
    user.verifyTokenExpiry = undefined;
    await user.save();
  } catch (error: any) {
    return NextResponse.json(
      {
        error: error.message
      },
      {
        status: 400
      }
    );
  }
}
