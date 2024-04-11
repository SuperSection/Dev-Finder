import Link from "next/link";
import { unstable_noStore } from "next/cache";

import { Button } from "@/components/ui/button";
import { getAllRooms } from "@/data-access/rooms";
import { RoomCard } from "./room-card";
import SearchBar from "./search-bar";
import Image from "next/image";


export default async function BrowseDevRooms({
  searchParams,
}: {
  searchParams: { search: string };
  }) {
  unstable_noStore();
  
  const rooms = await getAllRooms(searchParams.search);

  return (
    <main className="container mx-auto lg:p-16 lg:px-24 p-10 px-7 gap-2">
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
        {rooms && rooms.map((room) => (
          <RoomCard key={room.id} room={room} />
        ))}
      </div>

      {rooms.length < 1 && (
        <div className="text-lg mt-24 flex flex-col justify-center items-center gap-4">
          <Image src="/no-data.svg" width={200} height={200} alt="No data image" />
          Currently no online room available
        </div>
      )}
    </main>
  );
}
