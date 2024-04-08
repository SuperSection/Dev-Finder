import * as z from "zod";


const roomFormSchema = z
  .object({
    name: z
      .string()
      .min(1, {
        message: "Please provide a room name.",
      })
      .max(100),
    description: z
      .string()
      .min(1, { message: "Please provide description of the room." })
      .max(350),
    githubRepo: z.string(),
    tags: z
      .string()
      .min(1, { message: "Please provide the tech stack of your project." }),
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