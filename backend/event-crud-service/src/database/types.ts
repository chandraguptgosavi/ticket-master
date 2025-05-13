import { TicketTable } from "src/event/ticket/types/ticket";
import { EventTable } from "src/event/types/event";
import { VenueTable } from "src/venue/types/venue";

export interface Database {
  event: EventTable;
  venue: VenueTable;
  ticket: TicketTable;
}
