import { Injectable } from "@nestjs/common";
import { Event, NewEvent } from "./types/event";
import { EventRepository } from "./event.repository";
import { CreateEventDto } from "./dtos/create-event.dto";
import { EventMapper } from "./mappers/event.mapper";

@Injectable()
export class EventService {
  constructor(private readonly eventRepository: EventRepository) {}

  async getAllEvents(): Promise<Event[]> {
    return await this.eventRepository.getAllEvents();
  }

  async getEventById(id: number): Promise<Event | null> {
    return await this.eventRepository.getEventById(id);
  }

  async createEvent(event: CreateEventDto): Promise<Event> {
    const newEvent: NewEvent = EventMapper.toNewEvent(event);
    return await this.eventRepository.createEvent(newEvent);
  }
}
