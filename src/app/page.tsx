"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';


export default function LandingPage() {
  const session = useSession();
  const isUserLoggedIn = !!session.data;

  return (
    <div className="bg-white dark:bg-black min-h-screen">
      <div
        className="absolute inset-x-0 -top-40 transform-gpu overflow-hidden blur-3xl sm:-top-60"
        aria-hidden="true"
      >
        <div
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
      </div>
      <div className="mx-auto max-w-2xl py-24 px-6">
        <div className="flex flex-col text-center">
          <Image src="/logo.png" width={180} height={180} alt="App Logo" className="self-center rounded-lg drop-shadow-xl shadow-xl w-44 mb-8" />
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
            Find and Join Developers online in Video Call rooms
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            This platform is for pair programming and sharing your screen to code along
            with other developers online in video call rooms. Work together!
            Evolve together!
          </p>
          <div className="mt-8 flex items-center justify-center">
            <Button asChild>
              <Link href="/dev-rooms" className="relative z-10 px-7 py-6 font-semibold">
                {isUserLoggedIn ? "Explore Now" : "Get Started"}
              </Link>
            </Button>
          </div>
        </div>
      </div>
      <div
        className="absolute inset-x-0 top-[calc(100%-13rem)] transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-40rem)]"
        aria-hidden="true"
      >
        <div
          className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
      </div>
    </div>
  );
}
