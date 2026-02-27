import { NextRequest, NextResponse } from "next/server";

export default function middlewere(request:NextRequest){
    const path = request.nextUrl.pathname;
    const ispublicPath =  path === "/login" || path === "/signup";

    const token = request.cookies.get("token");

    // if i have the public url and also the token that means i have logged in.
    // i can't be access the login page again.
    if(ispublicPath && token){
        return NextResponse.redirect(new URL('/',request.nextUrl));
    }

    // the the path is not public that means the excuding the /login and /signup so i can't be access the 
    // profile page and other not public path.
    if(!ispublicPath && !token){
        return NextResponse.redirect(new URL('/login',request.nextUrl))
    }

}

export const config = {
    matcher :[
        '/',
        '/login', 
        '/logout',
        '/profile'
    ]
}