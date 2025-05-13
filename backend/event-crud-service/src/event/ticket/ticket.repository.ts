import { Injectable } from "@nestjs/common";
import { ITicketRepository } from "./i-ticket.repository";
import { Ticket, TicketUpdate } from "./types/ticket";
import { Kysely } from "kysely";
import { Database } from "src/database/types";
import { DatabaseException } from "src/common/exceptions/database.exception";
import { CreateTicketDto } from "./dtos/create-ticket.dto";

@Injectable()
export class TicketRepository implements ITicketRepository {
  constructor(private readonly db: Kysely<Database>) {}

  async getTicketsByEventId(eventId: number): Promise<Ticket[]> {
    try {
      const tickets = await this.db
        .selectFrom("ticket")
        .where("event_id", "=", eventId)
        .selectAll()
        .execute();
      return tickets;
    } catch (error) {
      throw new DatabaseException(error as Error);
    }
  }

  async getTicketById(ticketId: number): Promise<Ticket | null> {
    try {
      const ticket = await this.db
        .selectFrom("ticket")
        .where("id", "=", ticketId)
        .selectAll()
        .executeTakeFirst();
      return ticket ?? null;
    } catch (error) {
      throw new DatabaseException(error as Error);
    }
  }

  async createTickets(dto: CreateTicketDto): Promise<Ticket[]> {
    try {
      return await this.db
        .insertInto("ticket")
        .columns(["event_id", "price", "status"])
        .expression((eb) =>
          eb
            .selectFrom(
              eb
                .fn("generate_series", [eb.val(1), eb.val(dto.count)])
                .as("series_generator"),
            )
            .select([
              eb.val(dto.event_id).as("event_id"),
              eb.val(dto.price).as("price"),
              eb.val("available").as("status"),
            ]),
        )
        .returningAll()
        .execute();
    } catch (error) {
      throw new DatabaseException(error as Error);
    }
  }

  async updateTicket(ticketId: number, ticket: TicketUpdate): Promise<Ticket> {
    try {
      const [updatedTicket] = await this.db
        .updateTable("ticket")
        .set(ticket)
        .where("id", "=", ticketId)
        .returningAll()
        .execute();
      return updatedTicket;
    } catch (error) {
      throw new DatabaseException(error as Error);
    }
  }
}
