import { Type } from "class-transformer";
import {
  IsDate,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from "class-validator";

export class CreateEventDto {
  private static readonly TIME_HH_MM_SS_REGEX =
    /^(0[0-9]|1[0-9]|2[0-3]):(0[0-9]|[1-5][0-9]):(0[0-9]|[1-5][0-9])$/;

  @IsString()
  @MaxLength(255)
  @MinLength(1)
  name: string;

  @IsString()
  @IsOptional()
  description: string | null;

  @IsNumber()
  seats: number;

  @Type(() => Date)
  @IsDate()
  date: Date;

  @IsString()
  @Matches(CreateEventDto.TIME_HH_MM_SS_REGEX, {
    message: "Invalid start_time format. Expected HH:MM:SS (24-hour clock).",
  })
  start_time: string;

  @IsString()
  @Matches(CreateEventDto.TIME_HH_MM_SS_REGEX, {
    message: "Invalid end_time format. Expected HH:MM:SS (24-hour clock).",
  })
  end_time: string;

  @IsNumber()
  venue_id: number;
}
