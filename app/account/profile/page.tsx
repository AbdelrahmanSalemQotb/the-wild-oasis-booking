import SelectCountry from "@/app/_components/SelectCountry";
import UpdateProfileForm from "@/app/_components/UpdateProfileForm";
import { auth } from "@/app/_lib/auth";
import { getGuest } from "@/app/_lib/data-service";
import Loading from "@/app/loading";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export const metadata = {
  title: "Update profile",
};

export default async function Page() {
  return (
    <div>
      <h2 className="mb-2 text-center text-lg font-semibold text-accent-400 sm:mb-4 sm:text-start md:text-2xl">
        Update your guest profile
      </h2>

      <p className="mb-5 text-sm text-primary-200 sm:mb-8 md:text-lg">
        Providing the following information will make your check-in process
        faster and smoother. See you soon!
      </p>

      <Suspense fallback={<Loading />}>
        <Form />
      </Suspense>
    </div>
  );
}

async function Form() {
  const session = await auth();

  if (!session || !session.user || !session.user.email) {
    redirect("/login");
  }
  const guest = await getGuest(session.user.email);

  if (!guest) {
    throw new Error("Guest not found");
  }

  return (
    <UpdateProfileForm guest={guest}>
      <SelectCountry
        key={guest.nationality}
        name="nationality"
        id="nationality"
        className="w-full rounded-sm bg-primary-200 px-3 py-2 text-primary-800 shadow-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400 md:px-5 md:py-3"
        defaultCountry={guest.nationality}
      />
    </UpdateProfileForm>
  );
}
