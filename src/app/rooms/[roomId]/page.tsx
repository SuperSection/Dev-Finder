import Link from "next/link";
import { GithubIcon } from "lucide-react";
import { unstable_noStore } from "next/cache";

import { splitTags } from "@/lib/utils";
import { getRoom } from "@/data-access/rooms";
import { Button } from "@/components/ui/button";
import { TagsList } from "@/components/tags-list";
import { DevFinderVideoRoom } from "./video-player";


export default async function RoomPage(props: { params: { roomId: string } }) {
  unstable_noStore();
  const roomId = props.params.roomId;

  const room = await getRoom(roomId);

  if (!room) {
    return (
        <div className="flex items-center justify-center flex-col gap-3 my-72">
          <h1 className="font-medium text-xl">No room found with this ID.</h1>
          <Button asChild>
            <Link href="/dev-rooms" className="text-base">
              Find Rooms
            </Link>
          </Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-4">
      <div className="col-span-3 p-4 pr-2">
        <div className="drop-shadow-lg border bg-card text-card-foreground rounded-lg p-5">
          <DevFinderVideoRoom room={room} />
        </div>
      </div>

      <div className="col-span-1 p-4 pl-2">
        <div className="drop-shadow-lg border bg-card text-card-foreground rounded-lg p-5 flex flex-col gap-2">
          <h1 className="text-lg font-semibold">{room.name}</h1>

          {room.githubRepo && (
            <Link
              href={room.githubRepo}
              target="blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 mb-2 text-sm text-center hover:underline"
            >
              <GithubIcon size={20} />
              Github Project
            </Link>
          )}

          <p className="text-sm text-gray-500">{room.description}</p>
          <div className="mt-4">
          <TagsList tags={splitTags(room.tags)} />
          </div>

        </div>
      </div>
    </div>
  );
}
