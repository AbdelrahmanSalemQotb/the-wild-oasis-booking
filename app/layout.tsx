import { Metadata } from "next";
import { Josefin_Sans } from "next/font/google";
import Header from "./_components/Header";
import { ReservationProvider } from "./_components/ReservationContext";
import "./_styles/globals.css";

const Josefin = Josefin_Sans({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: {
    template: "%s | The Wild Oasis | Salem",
    default: "The Wild Oasis | Salem",
  },
  description:
    "Luxurious cabin hotel, located in the heart of the Italian Dolomites, surrounded by beautiful mountains and dark forests",
  keywords:
    "Wild Oasis, Wild Oasis Booking, The Wild Oasis Website, Nextjs project, Hotel, Travel, Adventure Trips, Jonas Schmedtmann, Salem, Cabin Hotel",
  applicationName: "The Wild Oasis Booking",
  referrer: "origin-when-cross-origin",
  themeColor: "#141c24",
  colorScheme: "dark",
  robots: "index, follow",

  authors: [
    {
      name: "Abdelrahman Salem",
      url: "https://github.com/AbdelrahmanSalemQotb",
    },
  ],

  openGraph: {
    type: "website",
    url: "https://the-wild-oasis-website-salem.vercel.app",
    title: "The Wild Oasis Booking | Salem",
    description:
      "Explore The Wild Oasis Booking. Find unique destinations, and plan your next wild getaway.",
    images: [
      {
        url: "https://the-wild-oasis-website-salem.vercel.app/thumbnail.png",
        width: 1920,
        height: 1080,
        alt: "Thumbnail image of The Wild Oasis Booking website",
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Wild Oasis Booking",
    description:
      "Explore The Wild Oasis Booking. Find unique destinations, and plan your next wild getaway.",

    site: "@AbdelrahmanSalemQotb",
    creator: "@AbdelrahmanSalemQotb",
    images: [
      {
        url: "https://the-wild-oasis-website-salem.vercel.app/thumbnail.png",
        width: 1920,
        height: 1080,
        alt: "Thumbnail image of The Wild Oasis Booking website",
      },
    ],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black",
    title: "The Wild Oasis Booking",
  },
};

function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        className={` ${Josefin.className} relative flex min-h-screen flex-col bg-primary-950 text-primary-100 antialiased`}
      >
        <Header />

        <div className="grid flex-1 px-5 py-6 sm:px-8 sm:py-12">
          <main className="mx-auto h-full w-full max-w-7xl">
            <ReservationProvider>{children}</ReservationProvider>
          </main>
        </div>
      </body>
    </html>
  );
}

export default RootLayout;
