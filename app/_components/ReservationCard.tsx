import { PencilSquareIcon } from "@heroicons/react/24/solid";
import { format, formatDistance, isPast, isToday, parseISO } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { BookingWithCabinBasic } from "../_types/BookingTypes";
import DeleteReservation from "./DeleteReservation";

export const formatDistanceFromNow = (dateStr: string) =>
  formatDistance(parseISO(dateStr), new Date(), {
    addSuffix: true,
  }).replace("about ", "");

function ReservationCard({
  booking,
  onDelete,
}: {
  booking: BookingWithCabinBasic;
  onDelete: (_bookingId: number) => void;
}) {
  const {
    id,
    startDate,
    endDate,
    numNights,
    totalPrice,
    numGuests,
    created_at,
    cabins,
  } = booking;

  if (!cabins) return null;
  const { name, image } = cabins;

  return (
    <div className="max-w-[750px] overflow-hidden rounded-lg border border-primary-800 bg-primary-950 shadow-lg transition-shadow hover:shadow-xl">
      <div className="relative h-48 w-full">
        <Image
          src={image ?? ""}
          alt={`Cabin ${name}`}
          className="object-cover"
          fill
          sizes="(max-width: 750px) 100vw"
        />
      </div>

      <div className="flex flex-col justify-between p-4 sm:p-6">
        <div className="space-y-3">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <h3 className="text-lg font-bold text-accent-400 sm:text-xl md:text-2xl">
              {numNights} nights in &apos;Cabin {name}&apos;
            </h3>
            {isPast(new Date(startDate)) ? (
              <span className="rounded-full bg-yellow-900/50 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-yellow-200">
                past
              </span>
            ) : (
              <span className="rounded-full bg-green-900/50 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-green-200">
                upcoming
              </span>
            )}
          </div>

          <p className="text-base text-primary-200 md:text-lg">
            {format(new Date(startDate), "EEE, MMM dd yyyy")} (
            {isToday(new Date(startDate))
              ? "Today"
              : formatDistanceFromNow(startDate)}
            ) &mdash; {format(new Date(endDate), "EEE, MMM dd yyyy")}
          </p>
        </div>

        <div className="mt-4 flex flex-col gap-4 border-t border-primary-800 pt-4">
          <div className="space-y-4 sm:flex sm:items-center sm:gap-4 sm:space-y-0">
            <div className="flex items-center justify-center gap-4 border-b border-primary-800 pb-4 sm:border-b-0 sm:pb-0">
              <p className="text-xl font-bold text-accent-400">${totalPrice}</p>
              <div className="h-4 w-px bg-primary-800"></div>
              <p className="text-center text-primary-200">
                {numGuests} guest{numGuests > 1 && "s"}
              </p>
            </div>

            <div className="flex items-center justify-center">
              <p className="text-sm text-primary-400">
                Booked {format(new Date(created_at), "MMM dd yyyy, p")}
              </p>
            </div>
          </div>

          {!isPast(new Date(startDate)) && (
            <div className="flex justify-center gap-5 border-t border-primary-800 pt-4">
              <Link
                href={`/account/reservations/edit/${id}`}
                className="flex items-center gap-2 rounded-md bg-accent-500/10 px-4 py-2 text-sm font-semibold text-accent-400 transition-colors hover:bg-accent-500/20"
              >
                <PencilSquareIcon className="h-4 w-4" />
                <span>Edit</span>
              </Link>
              <DeleteReservation bookingId={id} onDelete={onDelete} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ReservationCard;
