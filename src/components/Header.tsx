"use client"

import Link from "next/link";
import Image from "next/image";
import { LogInIcon, LogOutIcon } from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";


function AccountDropdown() {
  const session = useSession();

  const isUserLoggedIn = !!session.data;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="gap-2 p-3 py-6">
          <Avatar>
            <AvatarImage
              src={
                session.data?.user?.image ??
                "https://cdn-icons-png.flaticon.com/512/3237/3237447.png"
              }
              width={40}
              height={40}
              alt="Your Avatar"
            />
            <AvatarFallback>
              {session.data?.user.name?.split(" ")[0][0]}
            </AvatarFallback>
          </Avatar>
          {session.data?.user?.name}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {isUserLoggedIn ? (
          <DropdownMenuItem onClick={() => signOut()}>
            <LogOutIcon className="mr-2" /> Sign Out
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem onClick={() => signIn("google")}>
            <LogInIcon className="mr-2" /> Sign In
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}


export function Header() {
  return (
    <header className=" dark:bg-gray-900 bg-gray-100 p-2">
      <div className="flex justify-between items-center  container px-auto">
        <div>
          <Link href="/" className="flex items-center text-xl font-semibold">
            <Image
              src="/logo.png"
              width={50}
              height={50}
              alt="App Logo"
              className="rounded-full mr-4"
            />
            Dev<span className="text-sky-600">Finder</span>
          </Link>
        </div>
        <div className="flex items-center gap-3">
          <AccountDropdown />
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}