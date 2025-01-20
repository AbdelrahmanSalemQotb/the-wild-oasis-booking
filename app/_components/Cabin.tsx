import TextExpander from "@/app/_components/TextExpander";

import { EyeSlashIcon, MapPinIcon, UsersIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { CabinType } from "../_types/CabinTypes";

function Cabin({ cabin }: { cabin: CabinType }) {
  const { name, maxCapacity, image, description } = cabin;

  return (
    <div className="mb-12 grid grid-cols-1 grid-rows-[17rem_1fr] gap-8 border border-primary-800 px-3 py-3 sm:px-6 lg:mb-24 lg:grid-cols-[3fr_4fr] lg:grid-rows-1 lg:gap-20 lg:px-10">
      <div className="relative lg:-translate-x-3 lg:scale-[1.15]">
        <Image
          src={image || ""}
          alt={`Cabin ${name}`}
          fill
          sizes="(max-width: 1024px) 100vw, 60vw"
          className="object-cover"
        />
      </div>

      <div>
        <h3 className="mb-5 w-full bg-primary-950 pb-1 text-center text-4xl font-black text-accent-100 sm:text-5xl lg:w-[150%] lg:translate-x-[-254px] lg:p-6 lg:pb-1 lg:text-start lg:text-7xl">
          Cabin {name}
        </h3>

        <p className="mb-10 text-lg text-primary-300">
          {description && <TextExpander text={description} />}
        </p>

        <ul className="text-md mb-7 flex flex-col gap-4 sm:text-lg">
          <li className="flex items-center gap-3">
            <UsersIcon className="h-5 w-5 flex-shrink-0 text-primary-600" />
            <span>
              For up to <span className="font-bold">{maxCapacity}</span> guests
            </span>
          </li>
          <li className="flex items-center gap-3">
            <MapPinIcon className="h-5 w-5 flex-shrink-0 text-primary-600" />
            <span>
              Located in the heart of the{" "}
              <span className="font-bold">Dolomites</span> (Italy)
            </span>
          </li>
          <li className="flex items-center gap-3">
            <EyeSlashIcon className="h-5 w-5 flex-shrink-0 text-primary-600" />
            <span>
              Privacy <span className="font-bold">100%</span> guaranteed
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}
export default Cabin;
