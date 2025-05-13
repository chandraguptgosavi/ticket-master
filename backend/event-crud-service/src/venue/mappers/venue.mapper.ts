import { CreateVenueDto } from "../dtos/create-venue.dto";
import { NewVenue } from "../types/venue";

export const VenueMapper = {
  toNewVenue: (dto: CreateVenueDto): NewVenue => ({
    name: dto.name,
    capacity: dto.capacity,
    lat: dto.lat,
    long: dto.long,
  }),
};
