import ReservationList from "@/app/_components/ReservationList";
import { auth } from "@/app/_lib/auth";
import { getBookings } from "@/app/_lib/data-service";
import Loading from "@/app/loading";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export const metadata = {
  title: "Reservations",
};

export default async function Page() {
  return (
    <div>
      <h2 className="mb-7 text-2xl font-semibold text-accent-400">
        Your reservations
      </h2>

      <Suspense fallback={<Loading />}>
        <Reservations />
      </Suspense>
    </div>
  );
}

async function Reservations() {
  const session = await auth();

  if (!session || !session.user || !session.user.email) {
    redirect("/login");
  }

  const bookings = await getBookings(session?.user.guestId as number);

  if (bookings.length === 0) {
    return (
      <p className="text-lg">
        You have no reservations yet. Check out our{" "}
        <Link className="text-accent-500 underline" href="/cabins">
          luxury cabins &rarr;
        </Link>
      </p>
    );
  }

  return <ReservationList bookings={bookings} />;
}
