import Cabin from "@/app/_components/Cabin";
import Reservation from "@/app/_components/Reservation";
import Spinner from "@/app/_components/Spinner";
import { getCabin } from "@/app/_lib/data-service";
import { notFound } from "next/navigation";
import { Suspense } from "react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ cabinId: string }>;
}) {
  const { cabinId } = await params;
  const { name } = await getCabin(Number(cabinId));
  return { title: `Cabin ${name}` };
}

// if you want to generate static pages for each cabin, you can use this function

// export async function generateStaticParams() {
//   const cabins = await getCabins();
//   const ids = cabins.map((cabin) => ({ cabinId: String(cabin.id) }));
//   return ids;
// }

async function page({ params }: { params: Promise<{ cabinId: string }> }) {
  const { cabinId } = await params;

  if (!cabinId || isNaN(Number(cabinId))) {
    notFound();
  }

  const cabin = await getCabin(Number(cabinId));

  return (
    <div className="mx-auto mt-8 max-w-6xl">
      <Cabin cabin={cabin} />
      <div>
        <h2 className="mb-2 text-center text-xl font-semibold text-accent-400 sm:text-3xl md:mb-10 md:text-5xl">
          Reserve {cabin.name} today. Pay on arrival.
        </h2>
        <Suspense fallback={<Spinner />}>
          <Reservation cabin={cabin} />
        </Suspense>
      </div>
    </div>
  );
}

export default page;
