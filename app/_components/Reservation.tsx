import { auth } from "../_lib/auth";
import { getBookedDatesByCabinId, getSettings } from "../_lib/data-service";
import { CabinType } from "../_types/CabinTypes";
import DateSelector from "./DateSelector";
import LoginMessage from "./LoginMessage";
import ReservationForm from "./ReservationForm";

async function Reservation({ cabin }: { cabin: CabinType }) {
  const session = await auth();
  const [settings, bookedDates] = await Promise.all([
    getSettings(),
    getBookedDatesByCabinId(cabin.id),
  ]);

  return (
    <div className="grid min-h-[400px] grid-cols-1 overflow-hidden border border-primary-800 sm:grid-cols-2">
      <DateSelector
        cabin={cabin}
        settings={settings}
        bookedDates={bookedDates}
      />

      {session?.user ? (
        <ReservationForm
          cabin={cabin}
          user={session.user}
          bookedDates={bookedDates}
        />
      ) : (
        <LoginMessage />
      )}
    </div>
  );
}

export default Reservation;
