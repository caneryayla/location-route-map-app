import { create } from "zustand";

interface Location {
  id: string;
  lat: number;
  lng: number;
  color: string | null;
  name: string | null;
}

interface LocationStore {
  locations: Location[];
  addLocation: (loc: Location) => void;
  deleteLocation: (id: string) => void;
  editLocation: (id: string, newLoc: Location) => void;
}

export const useLocationStore = create<LocationStore>((set) => ({
  locations: [],
  addLocation: (loc) =>
    set((state) => ({ locations: [...state.locations, loc] })),
  deleteLocation: (id) =>
    set((state) => ({
      locations: state.locations.filter((loc) => loc.id !== id),
    })),
  editLocation: (id, newLoc) =>
    set((state) => ({
      locations: state.locations.map((loc) => (loc.id === id ? newLoc : loc)),
    })),
}));
