import { eq } from 'drizzle-orm';
import { db } from '@/db';
import { users } from '@/db/schema';

export async function deleteUser(userId: string) {
    await db.delete(users).where(eq(users.id, userId));
}