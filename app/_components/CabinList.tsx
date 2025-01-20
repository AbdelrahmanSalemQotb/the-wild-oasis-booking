import { CABIN_FILTERS } from "../_lib/constants";
import { getCabins } from "../_lib/data-service";
import { FilterValue } from "../_types/CabinTypes";
import CabinCard from "./CabinCard";

type Props = {
  filter: FilterValue;
};

async function CabinList({ filter = "all" }: Props) {
  const cabins = await getCabins();

  if (!cabins?.length) return null;

  const { min, max } = CABIN_FILTERS.find((f) => f.value === filter)
    ?.capacity ?? { min: 0, max: Infinity };

  const filteredCabins =
    filter === "all"
      ? cabins
      : cabins.filter(
          (cabin) => cabin.maxCapacity >= min && cabin.maxCapacity <= max,
        );

  return (
    <ul className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:gap-12 xl:gap-14">
      {filteredCabins.map((cabin) => (
        <li key={cabin.id}>
          <CabinCard cabin={cabin} />
        </li>
      ))}
    </ul>
  );
}

export default CabinList;
