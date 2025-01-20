import { UsersIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";
import { CabinCardType } from "../_types/CabinTypes";

function CabinCard({ cabin }: { cabin: CabinCardType }) {
  const { id, name, maxCapacity, regularPrice, discount, image } = cabin;

  return (
    <div className="grid grid-cols-1 grid-rows-[1fr,1fr] border border-primary-800 sm:grid-cols-[1fr_2fr] sm:grid-rows-1">
      <div className="relative">
        <Image
          src={image || ""}
          alt={`Cabin ${name}`}
          priority
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="border-r border-primary-800 object-cover object-center"
        />
      </div>

      <div className="">
        <div className="bg-primary-950 px-5 pb-4 pt-5 lg:px-7">
          <h3 className="mb-3 text-2xl font-semibold text-accent-500">
            Cabin {name}
          </h3>

          <div className="mb-2 flex items-center gap-3">
            <UsersIcon className="h-5 w-5 text-primary-600" />
            <p className="text-lg text-primary-200">
              For up to <span className="font-bold">{maxCapacity}</span> guests
            </p>
          </div>

          <p className="flex items-baseline justify-end gap-3">
            {discount > 0 ? (
              <>
                <span className="text-3xl font-[350]">
                  ${regularPrice - discount}
                </span>
                <span className="font-semibold text-primary-600 line-through">
                  ${regularPrice}
                </span>
              </>
            ) : (
              <span className="text-3xl font-[350]">${regularPrice}</span>
            )}
            <span className="text-primary-200">/ night</span>
          </p>
        </div>

        <div className="border-t border-t-primary-800 bg-primary-950 text-right">
          <Link
            href={`/cabins/${id}`}
            className="inline-block border-l border-primary-800 px-6 py-4 transition-all hover:bg-accent-600 hover:text-primary-900"
          >
            Details & reservation &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CabinCard;
