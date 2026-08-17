import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({
    message: "Logout Successful",
  });

  response.cookies.set("user_session", "", {
    expires: new Date(0),
    path: "/",
  });

  return response;
}