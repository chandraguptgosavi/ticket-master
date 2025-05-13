import { Module } from "@nestjs/common";
import { EventModule } from "./event/event.module";
import { ConfigModule } from "@nestjs/config";
import { VenueModule } from "./venue/venue.module";
import { DatabaseModule } from "src/database/database.module";

@Module({
  imports: [ConfigModule.forRoot(), DatabaseModule, EventModule, VenueModule],
})
export class AppModule {}
