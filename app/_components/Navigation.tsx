import Image from "next/image";
import Link from "next/link";
import { auth } from "../_lib/auth";
import MobileMenuButton from "./MobileMenuButton";

async function Navigation() {
  const linkStyle = "hover:text-accent-400 transition-colors";

  const session = await auth();

  return (
    <div className="flex items-center">
      <MobileMenuButton />

      <nav className="nav-menu fixed right-0 top-0 z-20 hidden h-screen w-[300px] bg-primary-950 px-8 pt-20 text-xl md:relative md:block md:h-auto md:w-auto md:bg-transparent md:px-0 md:pt-0">
        <ul className="flex list-none flex-col items-start gap-8 md:flex-row md:items-center md:gap-16">
          <li>
            <Link href="/cabins" className={linkStyle}>
              Cabins
            </Link>
          </li>
          <li>
            <Link href="/about" className={linkStyle}>
              About
            </Link>
          </li>
          <li>
            <Link
              href="/account"
              className={`${linkStyle} flex items-center gap-2`}
            >
              {session?.user && (
                <Image
                  src={session.user.image ?? "/default-user.jpg"}
                  alt="User avatar"
                  className="rounded-full"
                  height={32}
                  width={32}
                  referrerPolicy="no-referrer"
                />
              )}
              <span>Guest Area</span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Navigation;
