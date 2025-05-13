import { Module } from "@nestjs/common";
import { EventController } from "./event.controller";
import { EventService } from "./event.service";
import { TicketModule } from "./ticket/ticket.module";
import { EventRepository } from "./event.repository";

@Module({
  imports: [TicketModule],
  controllers: [EventController],
  providers: [EventService, EventRepository],
})
export class EventModule {}
