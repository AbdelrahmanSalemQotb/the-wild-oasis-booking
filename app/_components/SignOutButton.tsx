import { ArrowRightStartOnRectangleIcon } from "@heroicons/react/24/solid";
import { signOutAction } from "../_lib/actions";

function SignOutButton({ textClass = "" }: { textClass?: string }) {
  return (
    <form action={signOutAction}>
      <button className="flex items-center gap-4 px-3 py-3 font-semibold text-primary-200 transition-colors hover:bg-primary-900 hover:text-primary-100 sm:px-5">
        <span>
          <ArrowRightStartOnRectangleIcon className="h-5 w-5 text-primary-600" />
        </span>
        <span className={textClass}>Sign out</span>
      </button>
    </form>
  );
}

export default SignOutButton;
