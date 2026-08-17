import { NextRequest } from "next/server";
import { verifyToken } from "./auth";

export function getAuthUser(req: NextRequest) {

  const authHeader = req.headers.get("authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new Error("Unauthorized");
  }

  const token = authHeader.split(" ")[1];

  const decoded = verifyToken(token);

  return decoded;
}