"use client";

import Image from "next/image";
import { useActionState, useEffect, useState } from "react";
import { updateGuest } from "../_lib/actions";
import { GuestType } from "../_types/GuestTypes";
import SpinnerMini from "./SpinnerMini";

const inputClasses =
  "w-full rounded-sm bg-primary-200 px-3 py-2 text-primary-800 shadow-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400 md:px-5 md:py-3";

type ActionState = {
  success: boolean;
  errors: Record<string, string>;
};

function UpdateProfileForm({
  guest,
  children,
}: {
  children: React.ReactNode;
  guest: GuestType;
}) {
  const [showSuccess, setShowSuccess] = useState(false);
  const [state, formAction, isPending] = useActionState(
    (_state: ActionState, formData: FormData) => updateGuest(formData),
    {
      success: false,
      errors: {},
    },
  );

  useEffect(() => {
    if (state.success) {
      setShowSuccess(true);
      const timer = setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [state.success]);

  return (
    <form
      action={formAction}
      className="flex flex-col gap-4 bg-primary-900 px-4 py-4 text-sm sm:px-10 sm:py-6 md:gap-6 md:px-12 md:py-8 md:text-lg"
    >
      <div className="space-y-1 md:space-y-2">
        <label>Full name</label>
        <input disabled className={inputClasses} value={guest.fullName} />
      </div>

      <div className="space-y-2">
        <label>Email address</label>
        <input disabled className={inputClasses} value={guest.email} />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label htmlFor="nationality">Where are you from?</label>
          {guest.countryFlag && (
            <Image
              src={guest.countryFlag}
              alt="Country flag"
              className="h-5 rounded-sm"
              height={20}
              width={30}
            />
          )}
        </div>

        {children}
        {state.errors?.nationality && (
          <p className="mt-1 text-sm text-red-500">
            {state.errors.nationality}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <label htmlFor="nationalID">National ID number</label>
        <input
          name="nationalID"
          defaultValue={guest.nationalID}
          className={inputClasses}
        />
        {state.errors?.nationalID && (
          <p className="mt-1 text-sm text-red-500">{state.errors.nationalID}</p>
        )}
      </div>

      <div className="flex items-stretch justify-stretch gap-6 sm:items-center sm:justify-end">
        <button
          disabled={isPending}
          className="inline-block w-full bg-accent-500 px-6 py-3 font-semibold text-primary-800 transition-all hover:bg-accent-600 disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300 sm:w-auto md:px-8 md:py-4"
        >
          {isPending ? (
            <span className="flex items-center gap-2">
              <span>Updating</span>
              <SpinnerMini />
            </span>
          ) : (
            "Update profile"
          )}
        </button>
      </div>
      {showSuccess && (
        <p className="mt-1 text-center text-sm text-emerald-500">
          Profile updated successfully!
        </p>
      )}
      {state.errors?.submit && (
        <p className="mt-1 text-center text-sm text-red-500">
          {state.errors.submit}
        </p>
      )}
    </form>
  );
}

export default UpdateProfileForm;
