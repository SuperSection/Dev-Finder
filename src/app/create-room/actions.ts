"use server";

import { getSession } from "@/lib/auth";
import { Room } from "@/db/schema";
import { revalidatePath } from "next/cache";
import { createRoom } from "@/data-access/rooms";


export async function createRoomAction(roomData: Omit<Room, "id" | "userId">) {
  const session = await getSession();
  console.log("session", session);

  if (!session) {
    throw new Error("You must be logged in to create a room.");
  }

  await createRoom(roomData, session.user.id);

  revalidatePath("/dev-rooms");
}
