import { Module } from "@nestjs/common";
import { TicketService } from "./ticket.service";
import { TicketController } from "./ticket.controller";
import { TicketRepository } from "./ticket.repository";

@Module({
  providers: [TicketService, TicketRepository],
  controllers: [TicketController],
})
export class TicketModule {}
