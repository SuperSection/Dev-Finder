import Link from "next/link";
import { unstable_noStore } from "next/cache";

import { getRoom } from "@/data-access/rooms";
import { Button } from "@/components/ui/button";
import { EditRoomForm } from "./edit-room-from";


export default async function EditRoomPage({
  params,
}: {
  params: { roomId: string };
  }) {
  unstable_noStore();
  
  const room = await getRoom(params.roomId);

  if (!room) {
    return (
        <div className="flex items-center justify-center flex-col gap-3 my-72">
          <h1 className="font-medium text-xl">No room found with this ID.</h1>
          <Button asChild>
            <Link href="/dev-rooms" className="text-base">
              My Rooms
            </Link>
          </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto flex flex-col gap-8 py-10">
      <h1 className="text-4xl font-bold">Edit Room</h1>
      <EditRoomForm roomData={room} />
    </div>
  );
}
