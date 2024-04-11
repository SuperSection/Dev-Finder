"use client"

import Link from "next/link";
import Image from "next/image";
import { LogInIcon, LogOutIcon, DeleteIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { signIn, signOut, useSession } from "next-auth/react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
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
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { deleteAccountAction } from "@/app/actions";


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
            className="text-base flex gap-2 justify-"
            onClick={() =>
              signOut({
                callbackUrl: "/",
              })
            }
          >
            <LogOutIcon /> Sign Out
          </DropdownMenuItem>
        )}
        <DropdownMenuItem
          className="text-base flex pl-9"
          onClick={() => router.push("/my-rooms")}
        >
          My Rooms
        </DropdownMenuItem>
        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="ghost" className="text-base flex gap-2">
                <DeleteIcon className="rotate-180" /> Delete Account

              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete your
                  account and all the data associated with it.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={async () => {
                    await deleteAccountAction();
                    signOut({ callbackUrl: "/" });
                  }}
                >
                  Yes, delete my account
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
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
      <div className="flex justify-between items-center container px-auto">
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

        <nav className="flex gap-12 text-lg font-semibold ">
          {isUserLoggedIn && routerPath !== "/my-rooms" && (
            <Link
              className="hover:text-gray-700 dark:hover:text-gray-300 hidden sm:block"
              href="/my-rooms"
            >
              My Rooms
            </Link>
          )}
          {isUserLoggedIn && routerPath !== "/dev-rooms" && (
            <Link
              className="hover:text-gray-700 dark:hover:text-gray-300 hidden sm:block"
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