import CabinList from "@/app/_components/CabinList";
import Filter from "@/app/_components/Filter";
import { Suspense } from "react";
import ReservationReminder from "../_components/ReservationReminder";
import { FilterValue } from "../_types/CabinTypes";
import Loading from "./loading";

// the revalidate now has no effect because of searchParams use
// export const revalidate = 3600;

export const metadata = {
  title: "Cabins",
};

async function page(props: {
  searchParams: Promise<{ capacity?: FilterValue }>;
}) {
  const searchParams = await props.searchParams;
  const filter = searchParams.capacity ?? "all";

  return (
    <div className="">
      <h1 className="mb-5 text-center text-2xl font-medium text-accent-400 sm:text-start sm:text-4xl">
        Our Luxury Cabins
      </h1>
      <p className="text-md mb-10 text-primary-200 sm:text-lg">
        Cozy yet luxurious cabins, located right in the heart of the Italian
        Dolomites. Imagine waking up to beautiful mountain views, spending your
        days exploring the dark forests around, or just relaxing in your private
        hot tub under the stars. Enjoy nature&apos;s beauty in your own little
        home away from home. The perfect spot for a peaceful, calm vacation.
        Welcome to paradise.
      </p>

      <div className="mb-8 flex justify-end">
        <Filter />
      </div>
      <Suspense fallback={<Loading />}>
        <CabinList filter={filter} />
        <ReservationReminder />
      </Suspense>
    </div>
  );
}

export default page;
