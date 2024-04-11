"use client"

import { useForm } from "react-hook-form";
import { LoaderIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

import { Room } from "@/db/schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import verifyPasswordSchema, { VerifyPasswordType } from "@/validators/verifyPassword.schema";


export function ProvidePasswordPopup({ room }: { room: Room }) {
  const router = useRouter();

  const checkPasswordForm = useForm<VerifyPasswordType>({
    resolver: zodResolver(verifyPasswordSchema),
    defaultValues: {
      password: "",
    },
  });

  const {
    register,
    control,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = checkPasswordForm;

  async function checkPassword(values: VerifyPasswordType) {
    if (values.password === room.password) {
      router.push(`/rooms/${room.id}`);
    } else {
      checkPasswordForm.setValue("password", "");
      setError("password", { message: "Incorrect password." });
    }
  }
  

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button>Join Room</Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>This room is private</AlertDialogTitle>
          <AlertDialogDescription>
            Password is required for this room
          </AlertDialogDescription>
        </AlertDialogHeader>

        <Form {...checkPasswordForm}>
          <form
            className="flex flex-col gap-3"
            onSubmit={handleSubmit(checkPassword)}
          >
            <FormField
              control={control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Room Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      {...field}
                      {...register("password")}
                    />
                  </FormControl>
                  <FormMessage className="text-sm text-red-600">
                    {errors.password?.message}
                  </FormMessage>
                </FormItem>
              )}
            />

            <AlertDialogFooter>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <AlertDialogCancel
                  onClick={() => checkPasswordForm.setValue("password", "")}
                >
                  Cancel
                </AlertDialogCancel>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <LoaderIcon className="animate-spin" /> Joining...
                    </div>
                  ) : (
                    "Verify & Join"
                  )}
                </Button>
              </div>
            </AlertDialogFooter>
          </form>
        </Form>
      </AlertDialogContent>
    </AlertDialog>
  );
}

