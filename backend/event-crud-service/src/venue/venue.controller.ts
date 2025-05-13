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
import { VenueService } from "./venue.service";
import { Roles } from "src/common/decorators/roles.decorator";
import { RolesGuard } from "src/common/guards/roles.guard";
import { CreateVenueDto } from "./dtos/create-venue.dto";

@Controller("venues")
export class VenueController {
  constructor(private readonly venueService: VenueService) {}

  @Get()
  async getAllVenues() {
    return await this.venueService.getAllVenues();
  }

  @Get(":id")
  async getVenueById(@Param("id") id: string) {
    return await this.venueService.getVenueById(+id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(RolesGuard)
  @Roles("role_admin")
  async createVenue(@Body() venue: CreateVenueDto) {
    return await this.venueService.createVenue(venue);
  }
}
