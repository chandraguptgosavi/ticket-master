import { Type } from "class-transformer";
import { IsDate, IsIn, IsNumber, IsString } from "class-validator";

export class UpdateTicketDto {
  @IsString()
  @IsIn(["available", "booked"])
  status: "available" | "booked";

  @Type(() => Date)
  @IsDate()
  booked_at: Date;

  @IsNumber()
  booked_by: number | null;
}
