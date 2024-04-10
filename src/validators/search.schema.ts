import * as z from "zod";

const searchSchema = z.object({
    search: z.string(),
})

export type SearchBarType = z.infer<typeof searchSchema>;

export default searchSchema;