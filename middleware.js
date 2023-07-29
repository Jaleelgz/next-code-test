import { NextResponse } from "next/server";
import { CONSTANTS } from "./constants/constants";

export function middleware(request) {
  let loggedInUser = request.cookies.get("user");

  if (!loggedInUser) {
    if (["/users", "/"].includes(request.nextUrl.pathname)) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  const loggedInUserValue = JSON.parse(loggedInUser?.value);

  if (
    request.nextUrl.pathname === "/users" &&
    (loggedInUserValue?.username !== CONSTANTS.ADMIN_USERNAME ||
      loggedInUserValue?.password !== CONSTANTS.ADMIN_PASSWORD)
  ) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ["/", "/users"],
};
