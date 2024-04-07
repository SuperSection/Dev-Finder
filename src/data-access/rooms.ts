import {eq} from "drizzle-orm";
import { unstable_noStore } from "next/cache";

import { db } from "@/db";
import { rooms } from "@/db/schema";


export async function getAllRooms() {
  unstable_noStore();
  return await db.query.rooms.findMany();
}


export async function getRoom(roomId: string) {
  unstable_noStore();
  return await db.query.rooms.findFirst({
    where: eq(rooms.id, roomId),
  });
}