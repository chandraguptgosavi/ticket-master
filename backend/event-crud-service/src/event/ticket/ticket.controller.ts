import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { TicketService } from "./ticket.service";
import { CreateTicketDto } from "./dtos/create-ticket.dto";
import { RolesGuard } from "src/common/guards/roles.guard";
import { Roles } from "src/common/decorators/roles.decorator";

@Controller("events/:eventId/tickets")
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  @Get()
  async getTicketsByEventId(@Param("eventId") eventId: string) {
    return await this.ticketService.getTicketsByEventId(+eventId);
  }

  @Post()
  @UseGuards(RolesGuard)
  @Roles("role_admin")
  async createTickets(@Body() dto: CreateTicketDto) {
    return await this.ticketService.createTickets(dto);
  }
}
