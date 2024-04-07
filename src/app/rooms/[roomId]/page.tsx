import { Button } from "@/components/ui/button";
import { getRoom } from "@/data-access/rooms";
import { GithubIcon } from "lucide-react";
import Link from "next/link";

export default async function RoomPage(props: { params: { roomId: string } }) {
  const roomId = props.params.roomId;

  const room = await getRoom(roomId);

  if (!room) {
    return (
        <div className="flex items-center justify-center flex-col gap-3 my-72">
          <h1 className="font-medium text-xl"> No room found with this ID.</h1>
          <Button asChild>
            <Link href="/" className="text-base">
              Find Rooms
            </Link>
          </Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-4 min-h-screen">
      <div className="col-span-3 p-4 pr-2">
        <div className="drop-shadow-lg border bg-card text-card-foreground rounded-lg p-5">
          VIDEO PLAYER
        </div>
      </div>
      <div className="col-span-1 p-4 pl-2">
        <div
          className="drop-shadow-lg border bg-card text-card-foreground rounded-lg p-5 flex flex-col gap-3"
        >
          <h1 className="text-lg font-medium">{room.name}</h1>
          <p className="text-sm text-gray-500">{room.description}</p>
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
        </div>
      </div>
    </div>
  );
}
