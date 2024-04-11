export { default } from "next-auth/middleware";

export const config = { matcher: ["/my-rooms", "/dev-rooms", "/rooms", "/edit-room"] };
