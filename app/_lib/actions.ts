"use server";

import { auth, signIn, signOut } from "@/app/_lib/auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import supabase from "./supabase";

export async function signInAction() {
  await signIn("google", { redirectTo: "/account" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}

export async function updateGuest(formData: FormData) {
  const session = await auth();
  if (!session) {
    return {
      success: false,
      errors: { auth: "You must be logged in" },
    };
  }

  if (!session.user.guestId) {
    return {
      success: false,
      errors: { auth: "Guest ID not found" },
    };
  }

  const nationalID = formData.get("nationalID") as string | null;
  const nationalityData = formData.get("nationality") as string | null;

  const errors: Record<string, string> = {};

  if (!nationalityData) {
    errors.nationality = "Nationality is required";
    return {
      success: false,
      errors,
    };
  }

  if (!nationalID) {
    errors.nationalID = "National ID is required";
    return {
      success: false,
      errors,
    };
  } else if (!/^[a-zA-Z0-9]{6,12}$/.test(nationalID)) {
    errors.nationalID = "National ID must be 6-12 alphanumeric characters";
    return {
      success: false,
      errors,
    };
  }

  const [nationality, countryFlag] = nationalityData.split("%") as [
    string,
    string,
  ];

  const { error } = await supabase
    .from("guests")
    .update({
      nationality,
      countryFlag,
      nationalID: nationalID || undefined, // won't be undefined
    })
    .eq("id", session.user.guestId)
    .select()
    .single();

  if (error) {
    return {
      success: false,
      errors: { submit: "Guest could not be updated" },
    };
  }

  revalidatePath("/account");

  return { success: true, errors: {} };
}

export async function updateBookingAction(formData: FormData) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");
  if (!session.user.guestId) throw new Error("Guest ID not found");

  const bookingId = Number(formData.get("bookingId"));
  if (!bookingId || isNaN(bookingId)) throw new Error("Invalid booking ID");

  const updateData = {
    numGuests: Number(formData.get("numGuests")),
    observations: String(formData.get("observations") || "").slice(0, 1000),
  };

  const { error } = await supabase
    .from("bookings")
    .update(updateData)
    .eq("id", bookingId)
    .eq("guestId", session.user.guestId)
    .select()
    .single();

  if (error) throw new Error("Booking could not be updated");

  revalidatePath(`/account/reservations/edit/${bookingId}`);
  revalidatePath("/account/reservations");

  redirect("/account/reservations");
}

export async function deleteBookingAction(bookingId: number) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  if (!bookingId || isNaN(bookingId)) throw new Error("Invalid booking ID");

  const { data, error } = await supabase
    .from("bookings")
    .delete()
    .eq("id", bookingId)
    .eq("guestId", session.user.guestId);

  if (error) {
    console.error(error);
    throw new Error("Booking could not be deleted");
  }

  revalidatePath("/account/reservations");

  return data;
}
type BookingData = {
  startDate: Date;
  endDate: Date;
  numNights: number;
  cabinPrice: number;
  cabinId: number;
};
export async function createBooking(
  bookingData: BookingData,
  formData: FormData,
) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");
  if (!session.user.guestId) throw new Error("Guest ID not found");

  const newBooking = {
    ...bookingData,
    startDate: bookingData.startDate.toISOString(),
    endDate: bookingData.endDate.toISOString(),
    guestId: session.user.guestId,
    numGuests: Number(formData.get("numGuests")),
    observations: String(formData.get("observations") || "").slice(0, 1000),
    extrasPrice: 0,
    totalPrice: bookingData.cabinPrice,
    isPaid: false,
    hasBreakfast: false,
    status: "unconfirmed",
  } as const;

  const { error } = await supabase.from("bookings").insert([newBooking]);

  if (error) {
    throw new Error("Booking could not be created");
  }

  revalidatePath(`/cabins/${bookingData.cabinId}`);

  redirect("/cabins/thankyou");
}
