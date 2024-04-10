"use client"

import Link from "next/link";
import { GithubIcon, TrashIcon } from "lucide-react";

import { Room, rooms } from "@/db/schema";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { splitTags } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { TagsList } from "@/components/tags-list";
import { deleteRoomAction } from "./actions";


function DeleteRoom({ roomId }: { roomId: string }) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">
          <TrashIcon size={20} className="mr-2" />
          Delete Room
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your room
            and any data associated with it.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              // delete the room
              deleteRoomAction(roomId);
            }}
          >
            Yes, delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}



export function UserRoomCard({ room }: { room: Room }) {
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

      <div className="">
        <CardContent>
          <TagsList tags={splitTags(room.tags)} badgeType="secondary" />
        </CardContent>
        <CardFooter className="flex flex-wrap items-center justify-between gap-2">
          <Button asChild>
            <Link href={`/rooms/${room.id}`}>Join Room</Link>
          </Button>

          <DeleteRoom roomId={room.id} />
        </CardFooter>
      </div>
    </Card>
  );
}
