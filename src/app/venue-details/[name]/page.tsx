import { IVenue } from "@/app/types/venue";
import { apiCall } from "@/helper/apiCall";
import { formatRupiah } from "@/helper/formatRupiah";
import { MapPin } from "lucide-react";
import Image from "next/image";
import SlotPicker from "../components/slotPicker";

interface IVenueDetailsPage {
  params: { name: string };
}

export default async function VenueDetailsPage({ params }: IVenueDetailsPage) {
  const { name } = params;
  const res = await apiCall.get(`/venue?where=name%3D%27${name}%27`);
  const venueDetails: IVenue | undefined = res.data[0];

  return (
    <section className="px-30 py-10 min-h-screen bg-gray-100/30">
      <section>
        <div className="flex gap-10">
          <div
            id="banner"
            className="relative w-full overflow-hidden rounded-xl"
          >
            <Image
              src={venueDetails?.banner ?? "/assets/fallback.jpg"}
              alt="venue-banner"
              width={1000}
              height={1000}
              className="object-cover rounded-xl shadow-lg brightness-97"
            />
          </div>
          <div id="venue-details" className="mt-5">
            <h1 className="text-4xl font-semibold">{venueDetails?.name}</h1>
            <div className="flex gap-1 items-center mt-2">
              <Image
                src="/assets/star.png"
                alt="star"
                width={1000}
                height={1000}
                className="size-7"
              />
              <div className="text-md mt-1 flex gap-2 ">
                <p>{venueDetails?.rating}</p>
                <p className="text-gray-500">
                  ({venueDetails?.reviewer}) Reviews
                </p>
                <p className="flex items-center text-gray-500">
                  <MapPin className="size-4" />
                  {venueDetails?.city}
                </p>
              </div>
            </div>

            <div className="my-5">
              <p className=" text-3xl font-bold">
                {formatRupiah(venueDetails?.price ?? 0)}{" "}
                <span className="font-normal text-sm text-gray-500">
                  per jam
                </span>
              </p>
            </div>

            <div className="mt-5">
              <h2 className="text-2xl font-medium">Description</h2>
              <p className="mt-2">{venueDetails?.description}</p>
            </div>
          </div>
        </div>
      </section>
      <section id="booking-picker" className="mt-10">
        <SlotPicker venueData={venueDetails!} />
      </section>
    </section>
  );
}
