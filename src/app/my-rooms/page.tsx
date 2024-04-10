
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { getMyRooms } from "@/data-access/rooms";
import { UserRoomCard } from "./user-room-card";
import { unstable_noStore } from "next/cache";



export default async function YourRoomsPage() {
  unstable_noStore();

  const rooms = await getMyRooms();

  // if(!room) {
  //   return (
      
  //   )
  // }

  return (
    <main className="min-h-screen lg:p-16 lg:px-24 p-10 px-7 gap-2">
      <div className="w-full flex items-center justify-between mb-8">
        <h1 className="text-2xl sm:text-4xl font-bold">My Dev Rooms</h1>
        <Button asChild>
          <Link href="/create-room">Create Room</Link>
        </Button>
      </div>

      <div className="lg:grid grid-cols-3 gap-4 flex flex-col">
        {rooms.map((room) => {
          return <UserRoomCard key={room.id} room={room} />;
        })}
      </div>
    </main>
  );
}
