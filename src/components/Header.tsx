"use client"

import Link from "next/link";
import Image from "next/image";
import { LogInIcon, LogOutIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
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
  const router = useRouter();
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
              {session.data?.user.name?.split(" ").map((name) => name[0])}
            </AvatarFallback>
          </Avatar>
          <span className="hidden md:block">{session.data?.user?.name}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {isUserLoggedIn && (
          <DropdownMenuItem
            onClick={() =>
              signOut({
                callbackUrl: "/",
              })
            }
          >
            <LogOutIcon className="mr-2" /> Sign Out
          </DropdownMenuItem>
        )}
        <DropdownMenuItem
          className="text-base px-6 w-full"
          onClick={() => router.push("/my-rooms")}
        >
          My Rooms
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}


export function Header() {
  const session = useSession();
  const routerPath = usePathname();

  const isUserLoggedIn = !!session.data;

  return (
    <header className=" dark:bg-gray-900 bg-gray-100 p-2 z-10 relative">
      <div className="flex justify-between items-center  container px-auto">
        <div>
          <Link
            href="/dev-rooms"
            className="flex items-center text-xl font-semibold"
          >
            <Image
              src="/logo.png"
              width={45}
              height={45}
              alt="App Logo"
              className="rounded-full mr-3 hidden md:block"
            />
            Dev<span className="text-sky-600">Finder</span>
          </Link>
        </div>

        <nav>
          {isUserLoggedIn && routerPath !== "/my-rooms" && (
            <Link
              className="hover:text-gray-700 dark:hover:text-gray-300 text-xl font-semibold hidden md:block"
              href="/my-rooms"
            >
              My Rooms
            </Link>
          )}
          {isUserLoggedIn && routerPath !== "/dev-rooms" && (
            <Link
              className="hover:text-gray-700 dark:hover:text-gray-300 text-xl font-semibold hidden md:block"
              href="/dev-rooms"
            >
              Browse Rooms
            </Link>
          )}
        </nav>

        <div className="flex items-center gap-3">
          {isUserLoggedIn && <AccountDropdown />}
          {!isUserLoggedIn && (
            <Button onClick={() => signIn("google")} className="text-base">
              <LogInIcon className="mr-2" /> Sign In
            </Button>
          )}
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}