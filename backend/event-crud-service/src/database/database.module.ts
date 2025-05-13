import { Global, Module } from "@nestjs/common";
import { Kysely } from "kysely";
import type { Database } from "./types";
import { dialect } from "./pg-dialect";

@Global()
@Module({
  providers: [
    {
      provide: Kysely,
      useFactory: () => {
        return new Kysely<Database>({
          dialect: dialect,
        });
      },
    },
  ],
  exports: [Kysely],
})
export class DatabaseModule {}
