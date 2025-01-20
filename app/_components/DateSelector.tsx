"use client";

import {
  addDays,
  differenceInDays,
  eachDayOfInterval,
  isWithinInterval,
} from "date-fns";
import { DateRange, DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import { useMedia } from "../_hooks/useMedia";
import { CabinType } from "../_types/CabinTypes";
import { SettingsType } from "../_types/SettingsTypes";
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

type DateSelectorProps = {
  cabin: CabinType;
  settings: SettingsType;
  bookedDates: Date[];
};

type GetDisabledDatesProps = {
  range: DateRange;
  minBookingLength: number;
  bookedDates: Date[];
};

const getDisabledDates = ({
  range,
  minBookingLength,
  bookedDates,
}: GetDisabledDatesProps) => {
  if (!range.from || !minBookingLength) return bookedDates;

  const disabledRange = eachDayOfInterval({
    start: addDays(range.from, 1),
    end: addDays(range.from, minBookingLength),
  });

  return [...bookedDates, ...disabledRange];
};

function DateSelector({ cabin, settings, bookedDates }: DateSelectorProps) {
  const isBelowLg = useMedia("(max-width: 1024px)");
  const { range, resetRange, setRange } = useReservation();
  const displayRange = isAlreadyBooked(range, bookedDates)
    ? { from: undefined, to: undefined }
    : range;

  const { minBookingLength, maxBookingLength } = settings;
  const { regularPrice, discount } = cabin;

  const numNights =
    displayRange.from && displayRange.to
      ? differenceInDays(displayRange.to, displayRange.from)
      : 0;

  const cabinPrice = (regularPrice - discount) * numNights;

  return (
    <div className="flex flex-col justify-between">
      <DayPicker
        className="place-self-center pt-8 md:pt-12"
        mode="range"
        disabled={[
          ...getDisabledDates({
            range: displayRange,
            bookedDates,
            minBookingLength,
          }),
          { before: new Date() },
        ]}
        min={minBookingLength + 1}
        max={maxBookingLength + 1}
        startMonth={new Date()}
        hidden={{ before: new Date() }}
        endMonth={new Date(new Date().getFullYear() + 5, new Date().getMonth())}
        captionLayout="dropdown"
        numberOfMonths={isBelowLg ? 1 : 2}
        styles={{
          day: {
            width: "32px",
            height: "32px",
            padding: 0,
            fontSize: "0.875rem",
          },
          day_button: { width: "32px", height: "32px" },
          months: { justifyContent: "center", width: "100%", gap: "1rem" },
        }}
        onSelect={(date) => {
          setRange(date ?? { from: undefined, to: undefined });
        }}
        selected={displayRange}
      />

      <div className="flex max-h-[180px] min-h-[72px] flex-col flex-wrap items-center justify-center gap-3 bg-accent-500 px-2 py-2 text-primary-800 sm:px-4 lg:flex-row lg:justify-between lg:px-8">
        <div className="flex flex-wrap items-center justify-center gap-2 md:gap-4">
          <p className="flex items-baseline gap-1 sm:gap-2">
            {discount > 0 ? (
              <>
                <span className="text-xl lg:text-2xl">
                  ${regularPrice - discount}
                </span>
                <span className="font-semibold text-primary-700 line-through">
                  ${regularPrice}
                </span>
              </>
            ) : (
              <span className="text-xl lg:text-2xl">${regularPrice}</span>
            )}
            <span className="">/night</span>
          </p>
          {numNights ? (
            <>
              <p className="bg-accent-600 px-1 py-2 text-xl sm:px-3 lg:text-2xl">
                <span>&times;</span> <span>{numNights}</span>
              </p>
              <p>
                <span className="text-md font-bold uppercase lg:text-lg">
                  Total
                </span>{" "}
                <span className="text-md font-semibold lg:text-lg">
                  ${cabinPrice}
                </span>
              </p>
            </>
          ) : null}
        </div>

        {range.from || range.to ? (
          <button
            className="border border-primary-800 px-2 py-2 text-sm font-semibold sm:px-4"
            onClick={() => resetRange()}
          >
            Clear
          </button>
        ) : null}

        {range.from &&
          range.to &&
          range.to !== displayRange.to &&
          range.from !== displayRange.from && (
            <p className="text-xs">
              Date Selected is not available for this cabin, please change the
              date or choose another cabin.
            </p>
          )}
      </div>
    </div>
  );
}

export default DateSelector;
