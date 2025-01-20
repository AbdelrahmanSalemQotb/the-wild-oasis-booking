import { eachDayOfInterval } from "date-fns";
import { notFound } from "next/navigation";
import { TablesInsert } from "../_types/SupabaseTypes";
import supabase from "./supabase";

/////////////
// GET

export async function getCabin(id: number) {
  if (id !== 0 && !id) {
    notFound();
  }

  const { data, error } = await supabase
    .from("cabins")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    notFound();
  }

  return data;
}

export async function getCabinPrice(id: number) {
  const { data, error } = await supabase
    .from("cabins")
    .select("regularPrice, discount")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
  }

  return data;
}

export const getCabins = async function () {
  const { data, error } = await supabase
    .from("cabins")
    .select("id, name, maxCapacity, regularPrice, discount, image")
    .order("name");

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }

  return data;
};

// Guests are uniquely identified by their email address
export async function getGuest(email: string) {
  const { data } = await supabase
    .from("guests")
    .select("*")
    .ilike("email", email)
    .single();
  // No error here! We handle the possibility of no guest in the sign in callback
  return data;
}
export async function fetchGuestWithRetry(
  email: string,
  retries = 2,
  delay = 500,
) {
  for (let i = 0; i < retries; i++) {
    const { data } = await supabase
      .from("guests")
      .select("*")
      .eq("email", email)
      .single();

    if (data) {
      return data;
    }

    await new Promise((resolve) => setTimeout(resolve, delay));
  }

  throw new Error(
    `No guest found for email: ${email} after ${retries} attempts`,
  );
}

export async function getBooking(id: number) {
  const { data, error } = await supabase
    .from("bookings")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking could not get loaded");
  }

  return data;
}

export async function getBookings(guestId: number) {
  const { data, error } = await supabase
    .from("bookings")
    // We actually also need data on the cabins as well. But let's ONLY take the data that we actually need, in order to reduce downloaded data.
    .select(
      "id, created_at, startDate, endDate, numNights, numGuests, totalPrice, guestId, cabinId, cabins(name, image)",
    )
    .eq("guestId", guestId)
    .order("startDate");

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return data;
}

export async function getBookedDatesByCabinId(cabinId: number) {
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);
  const stringToday = today.toISOString();

  // Getting all bookings
  const { data, error } = await supabase
    .from("bookings")
    .select("*")
    .eq("cabinId", cabinId)
    .or(`startDate.gte.${stringToday},status.eq.checked-in`);

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  // Converting to actual dates to be displayed in the date picker
  const bookedDates = data
    .map((booking) => {
      return eachDayOfInterval({
        start: new Date(booking.startDate),
        end: new Date(booking.endDate),
      });
    })
    .flat();

  return bookedDates;
}

export async function getSettings() {
  const { data, error } = await supabase.from("settings").select("*").single();

  if (error) {
    console.error(error);
    throw new Error("Settings could not be loaded");
  }
  const { id: _id, created_at: _created_at, ...settingsWithoutMetadata } = data;
  return settingsWithoutMetadata;
}

const MAX_RETRIES = 3;
const INITIAL_DELAY = 1000; // 1 second

async function fetchWithRetry<T>(
  fn: () => Promise<T>,
  retries = MAX_RETRIES,
  delay = INITIAL_DELAY,
): Promise<T> {
  try {
    return await fn();
  } catch (error) {
    if (retries > 0) {
      await new Promise((resolve) => setTimeout(resolve, delay));
      return fetchWithRetry(fn, retries - 1, delay * 2);
    }
    throw error;
  }
}

export async function getCountries() {
  return fetchWithRetry(async () => {
    const res = await fetch(
      "https://restcountries.com/v2/all?fields=name,flag",
    );
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const countries = await res.json();
    return countries;
  }).catch(() => {
    throw new Error("Could not fetch countries after several retries");
  });
}

/////////////
// CREATE

export async function createGuest(newGuest: TablesInsert<"guests">) {
  const { data, error } = await supabase.from("guests").insert([newGuest]);

  if (error) {
    console.error(error);
    throw new Error("Guest could not be created");
  }

  return data;
}

export async function createBooking(newBooking: TablesInsert<"bookings">) {
  const { data, error } = await supabase
    .from("bookings")
    .insert([newBooking])
    // So that the newly created object gets returned!
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking could not be created");
  }

  return data;
}
