import { NewVenue, Venue } from "./types/venue";

export interface IVenueRepository {
  getAllVenues(): Promise<Venue[]>;
  getVenueById(id: number): Promise<Venue | null>;
  createVenue(venue: NewVenue): Promise<Venue>;
}
