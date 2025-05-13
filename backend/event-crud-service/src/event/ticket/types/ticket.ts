import {
  ColumnType,
  Generated,
  Insertable,
  Selectable,
  Updateable,
} from "kysely";

export interface TicketTable {
  id: Generated<number>;
  price: number;
  status: "available" | "booked";
  booked_at: ColumnType<Date | null, Date | null, Date>;
  booked_by: number | null;
  event_id: number;
}

export type Ticket = Selectable<TicketTable>;
export type NewTicket = Insertable<TicketTable>;
export type TicketUpdate = Updateable<TicketTable>;
