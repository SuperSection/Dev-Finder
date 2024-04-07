import Link from "next/link";
import { GithubIcon } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button";
import { Room } from "@/db/schema";
import { getAllRooms } from "@/data-access/rooms";


function RoomCard({ room }: { room: Room }) {
  return (
    <Card className="relative h-56">
      <CardHeader>
        <CardTitle>{room.name}</CardTitle>
        <CardDescription>{room.description}</CardDescription>
      </CardHeader>
      {room.githubRepo && (
        <CardContent>
          <Link
            href={room.githubRepo}
            target="blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:underline"
          >
            <GithubIcon />
            Github Project
          </Link>
        </CardContent>
      )}
      <CardContent className="flex gap-3 items-center">
        {room.language.split(",").map((language) => (
          <div key={language}>
            <span className="rounded-xl p-1.5 px-3 bg-slate-700">
              {language}
            </span>
          </div>
        ))}
      </CardContent>
      <CardFooter className="absolute bottom-0 right-0">
        <Button asChild>
          <Link href={`/rooms/${room.id}`}>Join Room</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}


export default async function Home() {
  const rooms = await getAllRooms();

  return (
    <main className="min-h-screen p-16 px-24 gap-2">
      <div className="w-full flex items-center justify-between mb-8">
        <h1 className="text-4xl">Find Dev Rooms</h1>
        <Button asChild>
          <Link href="/create-room">Create Room</Link>
        </Button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {rooms.map((room) => {
          return <RoomCard key={room.id} room={room} />;
        })}
      </div>
    </main>
  );
}
