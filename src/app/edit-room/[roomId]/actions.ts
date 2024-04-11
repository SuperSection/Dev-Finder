"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

import { Room } from "@/db/schema";
import { getSession } from "@/lib/auth";
import { updateRoom, getRoom } from "@/data-access/rooms";


export async function editRoomAction(roomData: Omit<Room, "userId">) {
  const session = await getSession();
  if (!session) {
    throw new Error("You must be logged in to create a room.");
  }

  // did the user create the room?
  const room = await getRoom(roomData.id);
  if (room?.userId !== session.user.id) {
    throw new Error("User not authorized to delete this room");
  }

  await updateRoom({...roomData, userId: room.userId});

  revalidatePath("/dev-rooms");
  revalidatePath(`/edit-room/${roomData.id}`);
  redirect("/dev-rooms");
}
