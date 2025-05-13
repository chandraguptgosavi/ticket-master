import { IsDecimal, IsNumber } from "class-validator";

export class CreateTicketDto {
  @IsDecimal()
  price: number;

  @IsNumber()
  count: number;

  @IsNumber()
  event_id: number;
}
