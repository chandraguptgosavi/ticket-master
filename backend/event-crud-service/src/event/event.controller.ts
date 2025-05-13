import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from "@nestjs/common";
import { EventService } from "./event.service";
import { RolesGuard } from "src/common/guards/roles.guard";
import { Roles } from "src/common/decorators/roles.decorator";
import { CreateEventDto } from "./dtos/create-event.dto";

@Controller("events")
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Get()
  async getAllEvents() {
    return await this.eventService.getAllEvents();
  }

  @Get(":id")
  async getEventById(@Param("id") id: string) {
    return await this.eventService.getEventById(+id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(RolesGuard)
  @Roles("role_admin")
  async createEvent(@Body() event: CreateEventDto) {
    return await this.eventService.createEvent(event);
  }
}
