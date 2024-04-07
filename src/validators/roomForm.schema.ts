import * as z from "zod";


const roomFormSchema = z
  .object({
    name: z
      .string()
      .min(1, {
        message: "Please provide a room name.",
      })
      .max(50),
    description: z
      .string()
      .min(1, { message: "Please provide description of the room." })
      .max(300),
    githubRepo: z.string(),
    language: z
      .string()
      .min(1, { message: "Please provide your tech stack." })
      .max(50),
    isPrivate: z.boolean().default(false),
    password: z.string(),
  })
  .refine(
    ({ isPrivate, password }) => {
      if (isPrivate) {
       return password.length > 0;
      }
      
      return true;
    },
    {
      message: "Password is required for private rooms.",
      path: ["password"]
    }
  ).refine(
    ({ isPrivate, password }) => {
      if (isPrivate) {
       return password.length >= 6;
      }

      return true;
    },
    {
    message: "Password must be at least 6 characters long.",
    path: ["password"]
  });


export type RoomForm = z.infer<typeof roomFormSchema>;

export default roomFormSchema;