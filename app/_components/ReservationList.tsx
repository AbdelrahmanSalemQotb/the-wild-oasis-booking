"use client";
import { useOptimistic } from "react";
import { deleteBookingAction } from "../_lib/actions";
import { BookingWithCabinBasic } from "../_types/BookingTypes";
import ReservationCard from "./ReservationCard";

function ReservationList({ bookings }: { bookings: BookingWithCabinBasic[] }) {
  const [optimisticBookings, optimisticDelete] = useOptimistic(
    bookings,
    (curBookings, bookingId) =>
      curBookings.filter((booking) => booking.id !== bookingId),
  );

  async function handleDelete(bookingId: number) {
    optimisticDelete(bookingId);
    await deleteBookingAction(bookingId);
  }

  return (
    <ul className="space-y-6">
      {optimisticBookings.map((booking) => (
        <ReservationCard
          booking={booking}
          key={booking.id}
          onDelete={handleDelete}
        />
      ))}
    </ul>
  );
}

export default ReservationList;
