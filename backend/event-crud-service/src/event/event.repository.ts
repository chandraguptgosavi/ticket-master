import { Kysely, sql } from "kysely";
import { Database } from "src/database/types";
import { IEventRepository } from "./i-event.repository";
import { Injectable } from "@nestjs/common";
import { Event, EventDetails, NewEvent } from "./types/event";
import { DatabaseException } from "src/common/exceptions/database.exception";
import { Ticket } from "./ticket/types/ticket";

@Injectable()
export class EventRepository implements IEventRepository {
  constructor(private readonly db: Kysely<Database>) {}

  async getAllEvents(): Promise<Event[]> {
    try {
      return await this.db
        .selectFrom("event")
        .where("event.date", ">=", new Date())
        .selectAll()
        .execute();
    } catch (error) {
      throw new DatabaseException(error as Error);
    }
  }

  async getEventById(id: number): Promise<Event | null> {
    try {
      const event = await this.db
        .selectFrom("event")
        .selectAll()
        .where("id", "=", id)
        .executeTakeFirst();

      return event ?? null;
    } catch (error) {
      throw new DatabaseException(error as Error);
    }
  }

  async getEventDetails(id: number): Promise<EventDetails | null> {
    try {
      const result = await this.db
        .selectFrom("event")
        .innerJoin("venue", "event.venue_id", "venue.id")
        .where("event.id", "=", id)
        .select([
          "event.id as event_id",
          "event.name as event_name",
          "event.description as event_desc",
          "event.seats as event_seats",
          "event.date as event_date",
          "event.start_time as event_start_time",
          "event.end_time as event_end_time",
          "venue.id as venue_id",
          "venue.name as venue_name",
          "venue.lat as venue_lat",
          "venue.long as venue_long",
          sql<string>`(
            SELECT COALESCE(json_agg(t.*), '[]'::json)
            FROM ticket t
            WHERE t.event_id = event.id
          )`.as("tickets_json"),
        ])
        .executeTakeFirst();

      if (!result) {
        return null;
      }

      const details: EventDetails = {
        event: {
          id: result.event_id,
          name: result.event_name,
          description: result.event_desc,
          seats: result.event_seats,
          date: result.event_date,
          start_time: result.event_start_time,
          end_time: result.event_end_time,
        },
        venue: {
          id: result.venue_id,
          name: result.venue_name,
          lat: result.venue_lat,
          long: result.venue_long,
        },
        tickets: JSON.parse(result.tickets_json || "[]") as Ticket[],
      };

      return details;
    } catch (error) {
      throw new DatabaseException(error as Error);
    }
  }

  async createEvent(event: NewEvent): Promise<Event> {
    try {
      const createdEvent = await this.db
        .insertInto("event")
        .values(event)
        .returningAll()
        .executeTakeFirstOrThrow();

      return createdEvent;
    } catch (error) {
      throw new DatabaseException(error as Error);
    }
  }
}
