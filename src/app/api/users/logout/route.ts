import { NextResponse } from "next/server"
export async function  GET(){
    try {
        const response =  NextResponse.json(
            {
                message:"Logout Successfull...",
                success:true
            }
        )
        response.cookies.set("token","",{ httpOnly:true, expires: new Date(0)});
        // this httponly is reposible for the expire the token.

        return response;
    } catch (error  ) {
        return NextResponse.json({"message" : "Something went wrong", success:false,error:error})
    }
}

