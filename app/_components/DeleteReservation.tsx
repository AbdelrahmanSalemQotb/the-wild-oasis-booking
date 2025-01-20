"use client";

import { TrashIcon } from "@heroicons/react/24/solid";
import { useTransition } from "react";
import SpinnerMini from "./SpinnerMini";

function DeleteReservation({
  bookingId,
  onDelete,
}: {
  bookingId: number;
  onDelete: (_bookingId: number) => void;
}) {
  const [isPending, startTransition] = useTransition();

  function handleDelete() {
    if (confirm("Are you sure you want to delete this reservation?"))
      startTransition(() => onDelete(bookingId));
  }

  return (
    <button
      onClick={handleDelete}
      className="flex items-center gap-2 rounded-md bg-accent-500/10 px-4 py-2 text-sm font-semibold text-accent-400 transition-colors hover:bg-accent-500/20"
    >
      {!isPending ? (
        <>
          <TrashIcon className="h-4 w-4" />
          <span>Delete</span>
        </>
      ) : (
        <span className="mx-auto">
          <SpinnerMini />
        </span>
      )}
    </button>
  );
}

export default DeleteReservation;
