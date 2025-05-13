import { CreateTicketDto } from "./dtos/create-ticket.dto";
import { Ticket, TicketUpdate } from "./types/ticket";

export interface ITicketRepository {
  getTicketsByEventId(eventId: number): Promise<Ticket[]>;
  getTicketById(ticketId: number): Promise<Ticket | null>;
  createTickets(dto: CreateTicketDto): Promise<Ticket[]>;
  updateTicket(ticketId: number, ticket: TicketUpdate): Promise<Ticket>;
}
