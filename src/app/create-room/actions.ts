"use server";

import { revalidatePath } from "next/cache";

import { Room } from "@/db/schema";
import { getSession } from "@/lib/auth";
import { createRoom } from "@/data-access/rooms";
import { redirect } from "next/navigation";


export async function createRoomAction(roomData: Omit<Room, "id" | "userId">) {
  //get the session
  const session = await getSession();
  if (!session) {
    throw new Error("You must be logged in to create a room.");
  }

  const newRoom = await createRoom(roomData, session.user.id);

  revalidatePath("/dev-rooms");

  return newRoom;
}