"use client";

import { FunnelIcon } from "@heroicons/react/24/solid";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { CABIN_FILTERS } from "../_lib/constants";
import { FilterValue } from "../_types/CabinTypes";

function Filter() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const activeFilter = (searchParams.get("capacity") as FilterValue) ?? "all";

  function handleFilter(filter: FilterValue) {
    const params = new URLSearchParams(searchParams);
    params.set("capacity", filter);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  return (
    <>
      {/* Dropdown for small screens */}
      <div className="sm:hidden">
        <div className="relative">
          <FunnelIcon className="absolute left-2 top-1/2 h-5 w-5 -translate-y-1/2 text-primary-600" />
          <select
            className="w-full border border-primary-800 bg-primary-950 py-2 pl-10 pr-5 text-primary-200 focus:outline-none [&>option]:bg-primary-950"
            value={activeFilter}
            onChange={(e) => handleFilter(e.target.value as FilterValue)}
          >
            {CABIN_FILTERS.map((filter) => (
              <option
                key={filter.value}
                value={filter.value}
                className="hover:bg-primary-800"
              >
                {filter.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      {/* Button group for larger screens */}
      <div className="hidden border border-primary-800 sm:flex">
        {CABIN_FILTERS.map((filter) => (
          <Button
            key={filter.value}
            filter={filter.value}
            handleFilter={handleFilter}
            activeFilter={activeFilter}
          >
            {filter.label}
          </Button>
        ))}
      </div>
    </>
  );
}

type ButtonProps = {
  filter: FilterValue;
  handleFilter: (_filter: FilterValue) => void;
  activeFilter: FilterValue;
  children: React.ReactNode;
};
function Button({ filter, handleFilter, activeFilter, children }: ButtonProps) {
  return (
    <button
      className={`px-5 py-2 hover:bg-primary-700 ${
        filter === activeFilter ? "bg-primary-700 text-primary-50" : ""
      }`}
      onClick={() => handleFilter(filter)}
    >
      {children}
    </button>
  );
}

export default Filter;
