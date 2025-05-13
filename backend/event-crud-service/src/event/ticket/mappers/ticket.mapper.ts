import { CreateTicketDto } from "../dtos/create-ticket.dto";
import { UpdateTicketDto } from "../dtos/update-ticket.dto";
import { NewTicket, TicketUpdate } from "../types/ticket";

export const TicketMapper = {
  toNewTicket: (dto: CreateTicketDto): NewTicket => ({
    price: dto.price,
    status: "available",
    event_id: dto.event_id,
  }),
  toTicketUpdate: (dto: UpdateTicketDto): TicketUpdate => ({
    status: dto.status,
    booked_by: dto.booked_by,
    booked_at: dto.booked_at,
  }),
};
