
import Link from "next/link";
import { unstable_noStore } from "next/cache";

import { UserRoomCard } from "./user-room-card";
import { Button } from "@/components/ui/button";
import { getMyRooms } from "@/data-access/rooms";


export default async function YourRoomsPage() {
  unstable_noStore();

  const rooms = await getMyRooms();
  console.log(rooms)

  if (rooms.length < 1) {
    return (
      <div className="flex items-center justify-center flex-col gap-3 my-72 text-center">
        <h1 className="font-bold text-2xl">You don&apos;t have any room yet</h1>
        <p className="text-base text-muted-foreground">Please create one to have your own room.</p>
        <Button className="mt-8" asChild>
          <Link href="/create-room" className="text-base">
            Create Room
          </Link>
        </Button>
      </div>
    );
  }


  return (
    <main className="lg:p-16 lg:px-24 p-10 px-7 gap-2">
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
