import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { formatRupiah } from "@/helper/formatRupiah";
import { ChevronDown, MapPin, Zap } from "lucide-react";
import Image from "next/image";
import { IVenue } from "../types/venue";
import { useRouter } from "next/navigation";

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
        <div className="grid grid-cols-4 gap-10">
          {venueList.map((venue, idx) => (
            <Card
              key={idx}
              className="overflow-hidden p-0 gap-0 hover:shadow-lg transform duration-300 ease-in-out hover:scale-102 cursor-pointer"
              onClick={() => router.push(`/venue-details/${venue.name}`)}
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

              <CardContent className="px-8 py-5">
                <h1 className="text-xl font-semibold">{venue.name}</h1>
                <div className="flex gap-1 items-center">
                  <Image
                    src="/assets/star.png"
                    alt="star"
                    width={1000}
                    height={1000}
                    className="size-6"
                  />
                  <div className="text-sm mt-1 flex gap-2 ">
                    <p>{venue.rating}</p>
                    <p className="text-gray-500">({venue.reviewer}) Reviews</p>
                    <p className="flex items-center text-gray-500">
                      <MapPin className="size-4" />
                      {venue.city}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-5">
                  <div>
                    <p className=" text-xl font-semibold">
                      {formatRupiah(venue.price)}{" "}
                      <span className="font-normal text-xs text-gray-500">
                        per jam
                      </span>
                    </p>
                  </div>
                  <Button className="bg-gradient-to-br from-amber-500 to-pink-500 cursor-pointer rounded-full text-xs">
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
