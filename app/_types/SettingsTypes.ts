import { Tables } from "./SupabaseTypes";

export type SettingsType = Omit<Tables<"settings">, "id" | "created_at">;
