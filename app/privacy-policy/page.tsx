import Link from "next/link";

const curDate = new Date().toLocaleDateString("en-US", {
  timeZone: "UTC",
  year: "numeric",
  month: "short",
  day: "numeric",
});

export default function PrivacyPolicy() {
  return (
    <main className="mt-10 px-4 sm:px-6 md:mt-16 lg:px-8">
      <h1 className="text-3xl font-bold text-primary-800">
        Privacy Policy for The Wild Oasis Booking
      </h1>
      <p className="mt-2 text-sm text-primary-700">Last Updated: {curDate}</p>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold text-primary-800">
          1. Introduction
        </h2>
        <p className="mt-4 text-primary-700">
          Welcome to The Wild Oasis Booking. Your privacy is important to us.
          This Privacy Policy explains how we collect, use, and protect your
          personal information when you sign in using Google.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold text-primary-800">
          2. Information We Collect
        </h2>
        <p className="mt-4 text-primary-700">
          When you sign in with Google, we collect and store the following data
          in our database (Supabase):
        </p>
        <ul className="mt-2 list-inside list-disc text-primary-700">
          <li>
            <strong>Full Name</strong> (as provided by Google).
          </li>
          <li>
            <strong>Email Address</strong> (for authentication and
            communication).
          </li>
          <li>
            <strong>Profile Picture URL</strong> (to personalize your
            experience).
          </li>
        </ul>
        <p className="mt-4 text-primary-700">
          We do <strong>not</strong> collect or store passwords, financial data,
          or sensitive personal details.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold text-primary-800">
          3. How We Use Your Information
        </h2>
        <p className="mt-4 text-primary-700">
          We use your information for the following purposes:
        </p>
        <ul className="mt-2 list-inside list-disc text-primary-700">
          <li>
            <strong>Authentication</strong>: Allowing users to sign in securely.
          </li>
          <li>
            <strong>User Profile Management</strong>: Displaying your name and
            profile picture in the app.
          </li>
          <li>
            <strong>Account Management</strong>: Keeping track of registered
            users.
          </li>
        </ul>
        <p className="mt-4 text-primary-700">
          Your data is{" "}
          <strong>never shared, sold, or used for marketing purposes</strong>.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold text-primary-800">
          4. How We Store and Protect Your Data
        </h2>
        <p className="mt-4 text-primary-700">
          Your information is securely stored in Supabase, which follows
          industry-standard security measures. We take reasonable steps to
          protect your data from unauthorized access, but we cannot guarantee
          100% security.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold text-primary-800">
          5. Third-Party Services
        </h2>
        <p className="mt-4 text-primary-700">
          We use{" "}
          <a
            href="https://policies.google.com/privacy"
            className="text-primary-800 underline hover:text-primary-600"
          >
            Google Sign-In
          </a>{" "}
          for authentication. Your login is handled by Google, and their{" "}
          <a
            href="https://policies.google.com/privacy"
            className="text-primary-800 underline hover:text-primary-600"
          >
            Privacy Policy
          </a>{" "}
          applies to authentication-related data.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold text-primary-800">
          6. Data Deletion
        </h2>
        <p className="mt-4 text-primary-700">
          If you wish to delete your account and associated data, please contact
          us at{" "}
          <a
            href="mailto:Salem.qotb.a@gmail.com"
            className="text-primary-800 underline hover:text-primary-600"
          >
            Salem.qotb.a@gmail.com
          </a>
          , and we will remove your information from our database.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold text-primary-800">
          7. Contact Us
        </h2>
        <p className="mt-4 text-primary-700">
          If you have any questions regarding this Privacy Policy, you can reach
          us at:{" "}
          <a
            href="mailto:Salem.qotb.a@gmail.com"
            className="text-primary-800 underline hover:text-primary-600"
          >
            Salem.qotb.a@gmail.com
          </a>
        </p>
      </section>

      <Link
        href="/"
        className="mt-8 inline-block text-primary-800 underline hover:text-primary-600"
      >
        Back to Home
      </Link>
    </main>
  );
}
