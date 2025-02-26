import type { Viewport } from "next";
import type { Metadata } from "next";
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
    "Wild Oasis, Wild Oasis Booking, The Wild Oasis Booking, The Wild Oasis Website, Nextjs project, Hotel, Travel, Adventure Trips, Jonas Schmedtmann, Salem, Cabin Hotel",
  applicationName: "The Wild Oasis Booking",
  referrer: "origin-when-cross-origin",
  robots: "index, follow",

  authors: [
    {
      name: "Abdelrahman Salem",
      url: "https://github.com/AbdelrahmanSalemQotb",
    },
  ],

  openGraph: {
    type: "website",
    siteName: "The Wild Oasis Booking | Salem",
    url: "https://the-wild-oasis-booking-salem.vercel.app",
    title: "The Wild Oasis Booking | Salem",
    description:
      "Explore The Wild Oasis Booking. Find unique destinations, and plan your next wild getaway.",
    images: [
      {
        url: "https://the-wild-oasis-booking-salem.vercel.app/thumbnail.png",
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
        url: "https://the-wild-oasis-booking-salem.vercel.app/thumbnail.png",
        width: 1920,
        height: 1080,
        alt: "Thumbnail image of The Wild Oasis Booking booking",
      },
    ],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black",
    title: "The Wild Oasis Booking",
  },
};

export const viewport: Viewport = {
  themeColor: "#141c24",
  colorScheme: "dark",
};

function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta name="google-site-verification" content="t3b38dQX-eQQ5VRogVZwwnAe_Sn1XNrFiym7mwL3Prw" />
      </head>
      <body
        className={` ${Josefin.className} relative flex min-h-screen flex-col bg-primary-950 text-primary-100 antialiased`}
      >
        <Header />

        <div className="grid flex-1 px-5 py-6 sm:px-8 sm:py-12">
          <div className="mx-auto h-full w-full max-w-7xl">
            <ReservationProvider>{children}</ReservationProvider>
          </div>
        </div>
      </body>
    </html>
  );
}

export default RootLayout;
