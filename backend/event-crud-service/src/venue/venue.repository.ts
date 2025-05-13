import { Kysely } from "kysely";
import { IVenueRepository } from "./i-venue.repository";
import { Venue, NewVenue } from "./types/venue";
import { Database } from "src/database/types";
import { DatabaseException } from "src/common/exceptions/database.exception";
import { Injectable } from "@nestjs/common";

@Injectable()
export class VenueRepository implements IVenueRepository {
  constructor(private readonly db: Kysely<Database>) {}

  async getAllVenues(): Promise<Venue[]> {
    try {
      return await this.db.selectFrom("venue").selectAll().execute();
    } catch (error) {
      throw new DatabaseException(error as Error);
    }
  }

  async getVenueById(id: number): Promise<Venue | null> {
    try {
      return (
        (await this.db
          .selectFrom("venue")
          .selectAll()
          .where("id", "=", id)
          .executeTakeFirst()) || null
      );
    } catch (error) {
      throw new DatabaseException(error as Error);
      throw new DatabaseException(error as Error);
    }
  }

  async createVenue(venue: NewVenue): Promise<Venue> {
    try {
      const createdVenue = await this.db
        .insertInto("venue")
        .values(venue)
        .returningAll()
        .executeTakeFirstOrThrow();
      return createdVenue;
    } catch (error) {
      throw new DatabaseException(error as Error);
    }
  }
}
