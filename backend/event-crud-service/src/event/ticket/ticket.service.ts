import { Injectable } from "@nestjs/common";
import { TicketRepository } from "./ticket.repository";
import { Ticket } from "./types/ticket";
import { CreateTicketDto } from "./dtos/create-ticket.dto";
import { TicketMapper } from "./mappers/ticket.mapper";
import { UpdateTicketDto } from "./dtos/update-ticket.dto";

@Injectable()
export class TicketService {
  constructor(private readonly ticketRepository: TicketRepository) {}

  async getTicketsByEventId(eventId: number): Promise<Ticket[]> {
    return await this.ticketRepository.getTicketsByEventId(eventId);
  }

  async getTicketById(ticketId: number): Promise<Ticket | null> {
    return await this.ticketRepository.getTicketById(ticketId);
  }

  async createTickets(dto: CreateTicketDto): Promise<Ticket[]> {
    return await this.ticketRepository.createTickets(dto);
  }

  async updateTicket(
    ticketId: number,
    ticket: UpdateTicketDto,
  ): Promise<Ticket> {
    const ticketUpdate = TicketMapper.toTicketUpdate(ticket);
    return await this.ticketRepository.updateTicket(ticketId, ticketUpdate);
  }
}
