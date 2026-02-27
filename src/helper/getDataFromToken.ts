import {NextRequest, NextResponse} from 'next/server';
import Jwt from 'jsonwebtoken';

const getDataFromToken = (request: NextRequest) => {
  try {
    //this will give you the incoded token
    const token = request.cookies.get('token')?.value || '';

    // we will decode the token using the JWT with the secreate.
    const decodedToken :any = Jwt.verify(token, process.env.TOKEN_SECRET!);
    return decodedToken.id;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export default getDataFromToken;
