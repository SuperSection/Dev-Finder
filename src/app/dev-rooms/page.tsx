import Link from "next/link";
import { unstable_noStore } from "next/cache";

import { Button } from "@/components/ui/button";
import { getAllRooms } from "@/data-access/rooms";
import { RoomCard } from "./room-card";
import SearchBar from "./search-bar";


export default async function BrowseDevRooms({
  searchParams,
}: {
  searchParams: { search: string };
  }) {
  unstable_noStore();
  
  const rooms = await getAllRooms(searchParams.search);

  return (
    <main className="lg:p-16 lg:px-24 p-10 px-7 gap-2">
      <div className="w-full flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold sm:text-4xl">Find Dev Rooms</h1>
        <Button asChild>
          <Link href="/create-room">Create Room</Link>
        </Button>
      </div>

      <div className="mb-10">
        <SearchBar />
      </div>

      <div className="lg:grid grid-cols-3 gap-4 flex flex-col">
        {rooms.map((room) => {
          return <RoomCard key={room.id} room={room} />;
        })}
      </div>
    </main>
  );
}
