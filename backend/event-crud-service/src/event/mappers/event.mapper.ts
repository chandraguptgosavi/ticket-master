import { CreateEventDto } from "../dtos/create-event.dto";
import { NewEvent } from "../types/event";

export const EventMapper = {
  toNewEvent: (dto: CreateEventDto): NewEvent => ({
    name: dto.name,
    date: dto.date,
    start_time: dto.start_time,
    end_time: dto.end_time,
    seats: dto.seats,
    venue_id: dto.venue_id,
    description: dto.description || null,
  }),
};
