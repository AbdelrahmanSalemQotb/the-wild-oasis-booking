// Keep this as .d.ts since it's a module augmentation
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: DefaultSession["user"] & {
      guestId: number;
    };
  }
}
