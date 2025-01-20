import image1 from "@/public/about-1.jpg";
import image2 from "@/public/about-2.jpg";
import Image from "next/image";
import Link from "next/link";
import { getCabins } from "../_lib/data-service";

export const revalidate = 86400;

export const metadata = {
  title: "About",
};

async function page() {
  const cabins = await getCabins();
  return (
    <div className="grid grid-cols-1 items-center gap-x-24 gap-y-14 text-sm md:text-lg lg:grid-cols-5 lg:gap-y-32">
      <div className="lg:col-span-3">
        <h1 className="mb-6 text-center text-xl font-medium text-accent-400 sm:text-2xl md:mb-10 md:text-start md:text-4xl">
          Welcome to The Wild Oasis
        </h1>
        <div className="space-y-3 sm:space-y-6 md:space-y-8">
          <p>
            Where nature&apos;s beauty and comfortable living blend seamlessly.
            Hidden away in the heart of the Italian Dolomites, this is your
            paradise away from home. But it&apos;s not just about the luxury
            cabins. It&apos;s about the experience of reconnecting with nature
            and enjoying simple pleasures with family.
          </p>
          <p>
            Our {cabins.length} luxury cabins provide a cozy base, but the real
            freedom and peace you&apos;ll find in the surrounding mountains.
            Wander through lush forests, breathe in the fresh air, and watch the
            stars twinkle above from the warmth of a campfire or your hot tub.
          </p>
          <p>
            This is where memorable moments are made, surrounded by
            nature&apos;s splendor. It&apos;s a place to slow down, relax, and
            feel the joy of being together in a beautiful setting.
          </p>
        </div>
      </div>
      <div className="hidden lg:col-span-2 lg:block">
        <Image
          src={image1}
          alt="Family sitting around a fire pit in front of cabin"
          placeholder="blur"
          quality={80}
        />
      </div>

      <div className="hidden lg:col-span-2 lg:block">
        <Image
          src={image2}
          alt="Family that manages The Wild Oasis"
          placeholder="blur"
          quality={80}
        />
      </div>
      <div className="lg:col-span-3">
        <h1 className="mb-6 text-center text-xl font-medium text-accent-400 sm:text-2xl md:mb-10 md:text-start md:text-4xl">
          Managed by our family since 1962
        </h1>
        <div className="space-y-8">
          <p>
            Since 1962, The Wild Oasis has been a cherished family-run retreat.
            Started by our grandparents, this haven has been nurtured with love
            and care, passing down through our family as a testament to our
            dedication to creating a warm, welcoming environment.
          </p>
          <p>
            Over the years, we&apos;ve maintained the essence of The Wild Oasis,
            blending the timeless beauty of the mountains with the personal
            touch only a family business can offer. Here, you&apos;re not just a
            guest; you&apos;re part of our extended family. So join us at The
            Wild Oasis soon, where tradition meets tranquility, and every visit
            is like coming home.
          </p>
          <div className="justify-self-center md:justify-self-auto">
            <Link
              href="/cabins"
              className="mt-2 inline-block bg-accent-500 px-4 py-3 text-lg font-semibold text-primary-800 transition-all hover:bg-accent-600 sm:mt-4 sm:px-8 sm:py-5"
            >
              Explore our luxury cabins
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
