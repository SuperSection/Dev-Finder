import * as z from "zod";

const verifyPasswordSchema = z.object({
  password: z.string().min(1, { message: "Please provide the room password." }),
});

export type VerifyPasswordType = z.infer<typeof verifyPasswordSchema>;

export default verifyPasswordSchema;
