import { FilterOption } from "@/app/_types/CabinTypes";

export const CABIN_FILTERS: FilterOption[] = [
  {
    value: "all",
    label: "All cabins",
    capacity: { min: 0, max: Infinity },
  },
  {
    value: "small",
    label: "2-3 guests",
    capacity: { min: 2, max: 3 },
  },
  {
    value: "medium",
    label: "4-7 guests",
    capacity: { min: 4, max: 7 },
  },
  {
    value: "large",
    label: "8-12 guests",
    capacity: { min: 8, max: 12 },
  },
];
