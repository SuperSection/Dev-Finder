"use client"

import { useEffect, useState } from "react";
import { GithubIcon } from "lucide-react";

import { Room } from "@/db/schema";
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
import Link from "next/link";
import { ProvidePasswordPopup } from "@/components/provide-password-popup";


export function RoomCard({ room }: { room: Room }) {
  const [showPasswordPopup, setShowPasswordPopup] = useState(false);

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

      <div className="flex flex-wrap justify-between items-center">
        <CardContent>
          <TagsList tags={splitTags(room.tags)} badgeType="secondary" />
        </CardContent>
        <CardFooter>
          {room.isPrivate ? (
            <ProvidePasswordPopup room={room} />
          ) : (
            <Button asChild>
              <Link href={`/rooms/${room.id}`}>Join Room</Link>
            </Button>
          )}
        </CardFooter>
      </div>
      
    </Card>
  );
}