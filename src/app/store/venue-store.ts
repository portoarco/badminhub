import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ISelectedVenueSlot } from "../types/venue";

interface VenueState {
  selectedVenueSlots: ISelectedVenueSlot[];
  addOrRemoveSlot: (slot: ISelectedVenueSlot) => void;
  removeSlotBySlotId: (slotId: number) => void;
  clearSlots: () => void;
}

export const useVenueStore = create(
  persist<VenueState>(
    (set) => ({
      selectedVenueSlots: [],
      addOrRemoveSlot: (slot) =>
        set((state) => {
          const exists = state.selectedVenueSlots.some(
            (s) => s.slotId === slot.slotId && s.date === slot.date
          );
          if (exists) {
            return {
              selectedVenueSlots: state.selectedVenueSlots.filter(
                (s) => !(s.slotId === slot.slotId && s.date === slot.date)
              ),
            };
          }
          return { selectedVenueSlots: [...state.selectedVenueSlots, slot] };
        }),
      removeSlotBySlotId: (slotId) =>
        set((state) => ({
          selectedVenueSlots: state.selectedVenueSlots.filter(
            (item) => item.slotId !== slotId
          ),
        })),
      clearSlots: () => set({ selectedVenueSlots: [] }),
    }),
    {
      name: "booked-slot",
      partialize: (state) => ({
        ...state,
        selectedVenueSlots: state.selectedVenueSlots,
      }),
    }
  )
);
