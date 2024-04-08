import Link from "next/link";
import { GithubIcon } from "lucide-react";

import { Room } from "@/db/schema";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button";
import { getAllRooms } from "@/data-access/rooms";
import { splitTags, TagsList } from "@/components/tags-list";


function RoomCard({ room }: { room: Room }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{room.name}</CardTitle>
        <CardDescription>{room.description}</CardDescription>
      </CardHeader>
      <CardContent>
      {room.githubRepo && (
          <Link
            href={room.githubRepo}
            target="blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:underline"
          >
            <GithubIcon />
            Github Project
          </Link>
      )}
      </CardContent>

      <div className="xl:flex lg:block flex justify-between items-center">
        <CardContent>
          <TagsList tags={splitTags(room.tags)} badgeType="secondary" />
        </CardContent>
        <CardFooter>
          <Button asChild>
            <Link href={`/rooms/${room.id}`}>Join Room</Link>
          </Button>
        </CardFooter>
      </div>
    </Card>
  );
}


export default async function Home() {
  const rooms = await getAllRooms();

  return (
    <main className="min-h-screen lg:p-16 lg:px-24 p-10 px-7 gap-2">
      <div className="w-full flex items-center justify-between mb-8">
        <h1 className="text-4xl font-bold">Find Dev Rooms</h1>
        <Button asChild>
          <Link href="/create-room">Create Room</Link>
        </Button>
      </div>

      <div className="lg:grid grid-cols-3 gap-4 flex flex-col">
        {rooms.map((room) => {
          return <RoomCard key={room.id} room={room} />;
        })}
      </div>
    </main>
  );
}
