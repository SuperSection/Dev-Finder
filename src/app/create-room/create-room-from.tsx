"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { LoaderIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

import { createRoomAction } from "./actions";
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
import { useToast } from "@/components/ui/use-toast";
import { Checkbox } from "@/components/ui/checkbox";
import roomFormSchema, { RoomForm } from "@/validators/roomForm.schema";


export default function CreateRoomForm() {
  const [isRoomPrivate, toggleRoomType] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  // 1. Define your form.
  const form = useForm<RoomForm>({
    resolver: zodResolver(roomFormSchema),
    defaultValues: {
      name: "",
      description: "",
      githubRepo: "",
      tags: "",
      isPrivate: false,
      password: "",
    },
  });

  const {
    register,
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = form;

  async function onSubmit(values: RoomForm) {
    const room = await createRoomAction(values);
    router.push(`/rooms/${room.id}`);
    toast({
      title: "Room Created",
      description: "Your room has been created successfully.",
    });
  }

  
  const handleCheckboxChange = () => {
    toggleRoomType(!isRoomPrivate);
    form.setValue("isPrivate", !form.getValues().isPrivate);
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

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <div className="flex items-center gap-2">
              <LoaderIcon className="animate-spin" /> Creating...
            </div>
          ) : (
            "Create Room"
          )}
        </Button>
      </form>
    </Form>
  );
}
