"use server";

import { db } from "@/db";
import { getSession } from "@/lib/auth";
import { Room, rooms } from "@/db/schema";


export async function createRoomAction(roomData: Omit<Room, "id" | "userId">) {
  const session = await getSession();
  console.log("session", session);

  if (!session) {
    throw new Error("You must be logged in to create a room.");
  }

  await db.insert(rooms).values({ ...roomData, userId: session?.user.id });
}
