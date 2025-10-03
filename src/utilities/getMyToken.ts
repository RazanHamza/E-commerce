"use server"
import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export default async function getMyToken() {
  try {
    let decodeToken =
      (await cookies()).get("__Secure-next-auth.session-token")?.value ||
      (await cookies()).get("next-auth.session-token")?.value;

    if (!decodeToken) {
      return null;
    }

    let token = await decode({
      token: decodeToken,
      secret: process.env.NEXTAUTH_SECRET!,
    });
    return token?.token; 
  } 
  catch (error) {
    return null;
  }
}
