import Logo from "@/app/_components/Logo";
import Navigation from "@/app/_components/Navigation";

function Header() {
  return (
    <header className="border-b border-primary-900 px-5 py-4 sm:px-8 sm:py-5">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <Logo />
        <Navigation />
      </div>
    </header>
  );
}

export default Header;
