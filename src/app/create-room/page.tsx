import React from "react";
import CreateRoomForm from "./create-room-from";


export default function CreateRoomPage() {
  return (
    <div className="container mx-auto flex flex-col gap-8 py-10">
      <h1 className="text-4xl font-bold">Create New Room</h1>
      <CreateRoomForm />
    </div>
  );
}
