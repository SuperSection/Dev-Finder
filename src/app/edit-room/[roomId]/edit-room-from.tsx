"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useParams, useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

import { editRoomAction } from "./actions";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import roomFormSchema, { RoomForm } from "@/validators/roomForm.schema";
import { Room } from "@/db/schema";



export function EditRoomForm({ roomData }: { roomData: Room }) {
  const [isRoomPrivate, toggleRoomType] = useState(roomData.isPrivate);

  const router = useRouter();

  const params = useParams();

  // 1. Define your form.
  const form = useForm<RoomForm>({
    resolver: zodResolver(roomFormSchema),
    defaultValues: {
      name: roomData.name,
      description: roomData.description ?? "",
      githubRepo: roomData.githubRepo ?? "",
      tags: roomData.tags,
      isPrivate: roomData.isPrivate ?? false,
      password: roomData.password ?? "",
    },
  });

  const {
    register,
    control,
    handleSubmit,
  } = form;

  // 2. Define a submit handler.
  async function onSubmit(values: RoomForm) {
    await editRoomAction({ id: params.roomId as string, ...values });
    router.push("/dev-rooms");
  }

  const handleCheckboxChange = () => {
    console.log(isRoomPrivate);
    toggleRoomType(!isRoomPrivate);

    // Update form value directly using control.setValue()
    form.setValue("isPrivate", !form.getValues().isPrivate); // Toggle value
  };


  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  {...register("name")}
                  placeholder="Awesome Project"
                />
              </FormControl>
              <FormDescription>This is your public room name</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  {...register("description")}
                  placeholder="I'm working on a new project, come join me"
                />
              </FormControl>
              <FormDescription>
                Please describe what you will be discussing or coding on
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="githubRepo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Github Repo</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  {...register("githubRepo")}
                  placeholder="https://github.com/SuperSection/Dev-Finder"
                />
              </FormControl>
              <FormDescription>
                Please put a link of the project you are working on
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tags</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  {...register("tags")}
                  placeholder="typescript, nextjs, tailwind"
                />
              </FormControl>
              <FormDescription>
                List your programming languages, frameworks, libraries so people
                can find their preferrences
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="isPrivate"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center space-x-2">
                <FormControl>
                  <Checkbox
                    id="privateRoom"
                    {...register("isPrivate")}
                    onCheckedChange={handleCheckboxChange}
                  />
                </FormControl>
                <FormLabel
                  htmlFor="privateRoom"
                  className="text-base font-medium"
                >
                  Private Room
                </FormLabel>
              </div>
            </FormItem>
          )}
        />

        {isRoomPrivate && ( // Conditionally render password input
          <FormField
            control={control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="password"
                    {...register("password")}
                    placeholder="Room Password"
                  />
                </FormControl>
                <FormDescription>
                  This password will be required to access the private room.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <Button type="submit">Update Room</Button>
      </form>
    </Form>
  );
}