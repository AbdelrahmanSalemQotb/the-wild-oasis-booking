import { auth } from "../_lib/auth";

export const metadata = {
  title: "Guest Area",
};

async function page() {
  const session = await auth();

  if (!session || !session.user) {
    return {
      redirect: "/login",
    };
  }
  const firstName = session.user.name?.split(" ")[0];

  return (
    <div>
      <h2 className="mb-7 text-2xl font-semibold text-accent-400">
        Welcome, {firstName}
      </h2>
    </div>
  );
}

export default page;
