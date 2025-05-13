import { Injectable } from "@nestjs/common";
import { VenueRepository } from "./venue.repository";
import { NewVenue, Venue } from "./types/venue";
import { CreateVenueDto } from "./dtos/create-venue.dto";
import { VenueMapper } from "./mappers/venue.mapper";

@Injectable()
export class VenueService {
  constructor(private readonly venueRepository: VenueRepository) {}

  async getAllVenues(): Promise<Venue[]> {
    return await this.venueRepository.getAllVenues();
  }

  async getVenueById(id: number): Promise<Venue | null> {
    return await this.venueRepository.getVenueById(id);
  }

  async createVenue(venue: CreateVenueDto): Promise<Venue> {
    const newVenue: NewVenue = VenueMapper.toNewVenue(venue);
    return await this.venueRepository.createVenue(newVenue);
  }
}
