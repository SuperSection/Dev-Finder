"use server";

import { StreamChat, TokenProvider } from "stream-chat";

import { getSession } from "@/lib/auth";
import { env } from "@/validators/validateEnv";

export async function generateTokenAction() {
  const session = await getSession();

  if (!session) {
    throw new Error("No session found.");
  }

  // Define values.
  const api_key = env.NEXT_PUBLIC_GET_STREAM_API_KEY;
  const api_secret = env.GET_STREAM_SECRET_KEY;

  // Initialize a Server Client
  const serverClient = StreamChat.getInstance(api_key, api_secret);

  // Create User Token
  const token = serverClient.createToken(session.user.id);
  return token;
}