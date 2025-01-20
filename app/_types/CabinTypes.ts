import { Tables } from "./SupabaseTypes";

export type CabinType = Tables<"cabins">;

export type CabinCardType = Pick<
  Tables<"cabins">,
  "id" | "name" | "maxCapacity" | "regularPrice" | "discount" | "image"
>;

export type FilterOption = {
  value: string;
  label: string;
  capacity: {
    min: number;
    max: number;
  };
};

export type FilterValue = FilterOption["value"];
