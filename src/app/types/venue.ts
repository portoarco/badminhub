export interface IVenue {
  id: string;
  name: string;
  banner: string;
  city: string;
  price: number;
  rating: number;
  reviewer: number;
  description: string;
  time_slots: {
    start_time: string;
    end_time: string;
  };
}
export interface ISelectedVenueSlot {
  slotId: number;
  venueName: string;
  venueCity: string;
  venuePrice: number;
  venueId: string;
  start_time: string;
  end_time: string;
  date: string;
}
