import { Event, EventDetails, NewEvent } from "./types/event";

export interface IEventRepository {
  getAllEvents(): Promise<Event[]>;
  getEventById(id: number): Promise<Event | null>;
  getEventDetails(id: number): Promise<EventDetails | null>;
  createEvent(event: NewEvent): Promise<Event>;
}
