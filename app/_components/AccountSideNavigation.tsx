"use client";
import {
  CalendarDaysIcon,
  HomeIcon,
  UserIcon,
} from "@heroicons/react/24/solid";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SignOutButton from "./SignOutButton";

const navLinks = [
  {
    name: "Home",
    href: "/account",
    icon: <HomeIcon className="h-5 w-5 text-primary-600" />,
  },
  {
    name: "Reservations",
    href: "/account/reservations",
    icon: <CalendarDaysIcon className="h-5 w-5 text-primary-600" />,
  },
  {
    name: "Guest profile",
    href: "/account/profile",
    icon: <UserIcon className="h-5 w-5 text-primary-600" />,
  },
];

function AccountSideNavigation() {
  const pathname = usePathname();

  return (
    <nav className="group relative max-w-[16rem] border-r border-primary-900 pb-1">
      <ul className="flex h-full w-[3rem] flex-col gap-2 overflow-hidden text-sm transition-[width] duration-300 group-hover:w-40 sm:w-[4rem] sm:text-lg sm:group-hover:w-64 md:w-64">
        {navLinks.map((link) => (
          <li key={link.name}>
            <Link
              className={`${pathname === link.href ? "bg-primary-900" : ""} flex items-center gap-4 px-3 py-3 font-semibold text-primary-200 transition-colors hover:bg-primary-900 hover:text-primary-100 sm:px-5`}
              href={link.href}
            >
              <span>{link.icon}</span>
              <span className="invisible text-nowrap opacity-0 transition-[visibility,opacity] duration-300 group-hover:visible group-hover:opacity-100 md:visible md:opacity-100">
                {link.name}
              </span>
            </Link>
          </li>
        ))}

        <li className="mt-auto">
          <SignOutButton textClass="invisible text-nowrap opacity-0 transition-[visibility,opacity] duration-300 group-hover:visible group-hover:opacity-100 md:visible md:opacity-100" />
        </li>
      </ul>
    </nav>
  );
}

export default AccountSideNavigation;
