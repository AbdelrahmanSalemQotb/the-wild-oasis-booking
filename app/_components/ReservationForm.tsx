"use client";
import { differenceInDays, isWithinInterval } from "date-fns";
import { User } from "next-auth";
import Image from "next/image";
import { useState } from "react";
import { DateRange } from "react-day-picker";
import { createBooking } from "../_lib/actions";
import { CabinType } from "../_types/CabinTypes";
import { useReservation } from "./ReservationContext";

function isAlreadyBooked(range: DateRange, datesArr: Date[]) {
  return (
    range?.from &&
    range?.to &&
    datesArr.some((date) =>
      isWithinInterval(date, { start: range.from!, end: range.to! }),
    )
  );
}
function ReservationForm({
  cabin,
  user,
  bookedDates,
}: {
  cabin: CabinType;
  user: User;
  bookedDates: Date[];
}) {
  const { range } = useReservation();
  const { maxCapacity, regularPrice, discount, id } = cabin;

  const [isLoading, setIsLoading] = useState(false);

  const displayRange = isAlreadyBooked(range, bookedDates)
    ? { from: undefined, to: undefined }
    : range;

  const startDate = displayRange.from as Date | undefined;
  const endDate = displayRange.to as Date | undefined;

  const numNights =
    startDate && endDate ? differenceInDays(endDate, startDate) : 0;
  const cabinPrice = numNights * (regularPrice - discount);

  async function handleSubmit(formData: FormData) {
    if (!startDate || !endDate) return;

    const bookingData = {
      startDate,
      endDate,
      numNights,
      cabinPrice,
      cabinId: id,
    };

    try {
      setIsLoading(true);
      await createBooking(bookingData, formData);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="md:scale-[1.01]">
      <div className="flex flex-row items-center justify-between bg-primary-800 px-5 py-2 text-primary-300 sm:flex-col md:flex-row md:px-8 lg:px-14">
        <p>Logged in as</p>

        <div className="flex items-center gap-4">
          {user.image && (
            <Image
              src={user.image}
              alt="User profile image"
              className="rounded-full"
              width={30}
              height={30}
            />
          )}
          {user.name && <p>{user.name.split(" ").at(0)}</p>}
        </div>
      </div>

      <form
        action={handleSubmit}
        className="flex h-full flex-col gap-5 bg-primary-900 px-5 py-12 text-sm md:px-8 md:text-lg lg:px-14 lg:py-10"
      >
        <div className="space-y-2">
          <label htmlFor="numGuests">How many guests?</label>
          <select
            name="numGuests"
            id="numGuests"
            className="w-full rounded-sm bg-primary-200 px-3 py-3 text-primary-800 shadow-sm sm:px-5"
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
          <label htmlFor="observations ">
            Anything we should know about your stay?
          </label>
          <textarea
            name="observations"
            id="observations"
            className="w-full rounded-sm bg-primary-200 px-5 py-3 text-primary-800 shadow-sm"
            placeholder="Any pets, allergies, special requirements, etc.?"
          />
        </div>

        <div className="flex flex-col items-center justify-end gap-1 sm:flex-row md:gap-6">
          {startDate && endDate ? (
            <button
              disabled={isLoading}
              className="bg-accent-500 px-4 py-2 font-semibold text-primary-800 transition-all hover:bg-accent-600 disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300 lg:px-8 lg:py-4"
            >
              {isLoading ? "Processing..." : "Reserve now"}
            </button>
          ) : (
            <p className="text-xs text-primary-300 lg:text-base">
              Start by selecting dates
            </p>
          )}
        </div>
      </form>
    </div>
  );
}

export default ReservationForm;
