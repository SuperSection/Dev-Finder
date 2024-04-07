import { db } from "@/db";

export default async function Home() {

  const rooms = await db.query.rooms.findMany();

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      {rooms.map((room) => {
        return (
          <div key={room.id} className="flex flex-col items-center">
            <h1 className="text-2xl">{room.name}</h1>
            <p>{room.description}</p>
          </div>
        );
      })}
    </main>
  );
}
