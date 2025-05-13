import { Generated, Insertable, Selectable, Updateable } from "kysely";

export interface VenueTable {
  id: Generated<number>;
  name: string;
  capacity: number;
  lat: number | null;
  long: number | null;
}

export type Venue = Selectable<VenueTable>;
export type NewVenue = Insertable<VenueTable>;
export type VenueUpdate = Updateable<VenueTable>;
