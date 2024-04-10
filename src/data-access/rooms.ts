import { eq, ilike } from "drizzle-orm";

import { db } from "@/db";
import { rooms } from "@/db/schema";
import { getSession } from "@/lib/auth";


export async function getAllRooms(search: string | undefined) {
  return await db.query.rooms.findMany({
    where: search ? ilike(rooms.tags, `%${search}%`) : undefined,
  });
}


export async function getRoom(roomId: string) {
  return await db.query.rooms.findFirst({
    where: eq(rooms.id, roomId),
  });
}


export async function getMyRooms() {
  const session = await getSession();
  if (!session) {
    throw new Error("User not authenticated.");
  }

  const myRooms = await db.query.rooms.findMany({
    where: eq(rooms.userId, session.user.id),
  });
  return myRooms;
}


export async function deleteRoom(roomId: string) {
  await db.delete(rooms).where(eq(rooms.id, roomId));
}
