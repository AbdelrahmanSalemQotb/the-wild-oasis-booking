import SubmitButton from "@/app/_components/SubmitButton";
import { updateBookingAction } from "@/app/_lib/actions";
import { auth } from "@/app/_lib/auth";
import { getBooking, getCabin } from "@/app/_lib/data-service";
import Link from "next/link";

export const metadata = {
  title: "Edit Reservation",
};

const notFound = (
  <div className="flex h-full w-full flex-col items-center justify-center gap-6">
    <p className="text-center text-2xl font-bold sm:text-3xl">
      Booking Not Found
    </p>
    <Link
      href="/account/reservations"
      className="bg-accent-500 px-6 py-3 font-semibold text-primary-800 transition-all hover:bg-accent-600 disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300 sm:px-8 sm:py-4"
    >
      Back to Reservations
    </Link>
  </div>
);

async function page({ params }: { params: Promise<{ bookingId: string }> }) {
  const { bookingId } = await params;
  const session = await auth();
  if (!bookingId || isNaN(Number(bookingId))) {
    return notFound;
  }

  let booking;
  try {
    booking = await getBooking(Number(bookingId));
  } catch {
    return notFound;
  }

  if (booking.guestId !== session?.user.guestId) {
    return notFound;
  }

  const { numGuests, observations, cabinId } = booking;
  const { maxCapacity } = await getCabin(cabinId);

  return (
    <div>
      <h2 className="mb-7 text-xl font-semibold text-accent-400 sm:text-2xl">
        Edit Reservation #{bookingId}
      </h2>

      <form
        action={updateBookingAction}
        className="flex flex-col gap-6 bg-primary-900 px-6 py-4 text-lg sm:px-12 sm:py-8"
      >
        <input type="hidden" value={bookingId} name="bookingId" />

        <div className="space-y-2">
          <label htmlFor="numGuests" className="text-sm sm:text-base">
            How many guests?
          </label>
          <select
            name="numGuests"
            id="numGuests"
            defaultValue={numGuests}
            className="w-full rounded-sm bg-primary-200 px-5 py-3 text-primary-800 shadow-sm"
            required
          >
            <option value="" key="">
              Select number of guests...
            </option>
            {Array.from({ length: maxCapacity }, (_, i) => i + 1).map((x) => (
              <option value={x} key={x}>
                {x} {x === 1 ? "guest" : "guests"}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="observations" className="text-sm sm:text-base">
            Anything we should know about your stay?
          </label>
          <textarea
            name="observations"
            id="observations"
            defaultValue={observations || ""}
            className="w-full rounded-sm bg-primary-200 px-5 py-3 text-primary-800 shadow-sm"
          />
        </div>

        <div className="flex items-center justify-center gap-6 sm:justify-end">
          <SubmitButton pendingLabel="Updating...">
            Update reservation
          </SubmitButton>
        </div>
      </form>
    </div>
  );
}

export default page;
