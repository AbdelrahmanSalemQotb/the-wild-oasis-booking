import { Tables } from "./SupabaseTypes";

export type BookingType = Tables<"bookings">;

export type BookingWithGuest = Tables<"bookings"> & {
  guests: Tables<"guests"> | null;
};

export type BookingWithCabin = Tables<"bookings"> & {
  cabins: Tables<"cabins"> | null;
};

export type BookingWithCabinAndGuest = BookingWithGuest & BookingWithCabin;

export type BookingUpdates = Partial<BookingType>;

export type BookingWithCabinBasic = {
  id: number;
  created_at: string;
  startDate: string;
  endDate: string;
  numNights: number;
  numGuests: number;
  totalPrice: number;
  guestId: number;
  cabinId: number;
  cabins: {
    name: string | null;
    image: string | null;
  };
};
