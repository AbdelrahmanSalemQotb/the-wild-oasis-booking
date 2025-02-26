import SignInButton from "../_components/SignInButton";

export const metadata = {
  title: "Sign in",
};

function page() {
  return (
    <main className="mt-10 flex flex-col items-center gap-10">
      <h2 className="text-center text-3xl font-semibold">
        Sign in to access your guest area
      </h2>

      <SignInButton />
    </main>
  );
}

export default page;
