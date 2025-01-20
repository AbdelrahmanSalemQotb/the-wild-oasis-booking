import AccountSideNavigation from "../_components/AccountSideNavigation";

function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="-ml-4 grid h-full grid-cols-[auto_1fr] gap-3 sm:-ml-4 sm:gap-6 md:ml-0 md:gap-12">
      <AccountSideNavigation />
      <div className="max-h-full max-w-full overflow-auto py-1">{children}</div>
    </div>
  );
}

export default layout;
