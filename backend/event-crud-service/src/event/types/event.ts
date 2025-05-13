import {
  ColumnType,
  Generated,
  Insertable,
  Selectable,
  Updateable,
} from "kysely";
import { Venue } from "src/venue/types/venue";
import { Ticket } from "../ticket/types/ticket";

export interface EventTable {
  id: Generated<number>;
  name: string;
  description: string | null;
  seats: number;
  date: ColumnType<Date, Date>;
  start_time: string;
  end_time: string;
  venue_id: number;
}

export type EventDetails = {
  event: Omit<Event, "venue_id">;
  venue: Omit<Venue, "capacity">;
  tickets: Ticket[];
};

export type Event = Selectable<EventTable>;
export type NewEvent = Insertable<EventTable>;
export type EventUpdate = Updateable<EventTable>;
