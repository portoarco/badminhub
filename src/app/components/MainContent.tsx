import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { formatRupiah } from "@/helper/formatRupiah";
import { ChevronDown, MapPin, Zap } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { IVenue } from "../types/venue";

interface IMainContent {
  venueList: IVenue[];
}

export default function MainContent({ venueList }: IMainContent) {
  const router = useRouter();

  return (
    <main className="p-10">
      <section className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold">Our Sports Venues</h1>
        <Button variant={"outline"}>
          Explore More <ChevronDown />
        </Button>
      </section>
      <section id="venues-card" className="mt-10">
        <div className="grid grid-cols-1 md:grid-cols-2  xl:grid-cols-4 gap-10">
          {venueList.map((venue, idx) => (
            <Card
              key={idx}
              className="overflow-hidden p-0 gap-0 hover:shadow-lg transform duration-300 ease-in-out hover:scale-102 cursor-pointer"
            >
              <div>
                <Image
                  src={venue.banner}
                  alt={venue.name}
                  width={1000}
                  height={1000}
                  className="w-full h-48 object-cover"
                />
              </div>

              <CardContent className="md:px-8 md:py-5 p-5">
                <h1 className="text-lg font-semibold max-lg:text-center">
                  {venue.name}
                </h1>
                <p className="flex mt-3 gap-2 items-center text-gray-500">
                  <MapPin className="size-4" />
                  {venue.city}
                </p>
                <div className="flex mt-2 gap-1 items-center">
                  <Image
                    src="/assets/star.png"
                    alt="star"
                    width={1000}
                    height={1000}
                    className="size-6"
                  />
                  <div className="text-sm mt-1 flex items-center  gap-2 ">
                    <p>{venue.rating?.toFixed(2) ?? "0.00"}</p>
                    <p className="text-gray-500 text-xs">
                      ({venue.reviewer}) Reviews
                    </p>
                    <p className=" hidden lg:flex  items-center text-gray-500">
                      <MapPin className="size-4" />
                      {venue.city}
                    </p>
                  </div>
                </div>

                <div className="flex max-lg:flex-col gap-y-2 items-center justify-between mt-5">
                  <div>
                    <p className=" text-xl font-semibold">
                      {formatRupiah(venue.price)}{" "}
                      <span className="font-normal text-xs text-gray-500">
                        per jam
                      </span>
                    </p>
                  </div>
                  <Button
                    className="bg-gradient-to-br from-amber-500 to-pink-500 cursor-pointer rounded-full text-xs"
                    onClick={() => router.push(`/venue-details/${venue.id}`)}
                  >
                    <Zap /> Booking Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </main>
  );
}
