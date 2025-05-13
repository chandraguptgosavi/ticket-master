import {
  IsNumber,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from "class-validator";

export class CreateVenueDto {
  @IsString()
  @MaxLength(255)
  @MinLength(1)
  name: string;

  @IsNumber()
  capacity: number;

  @IsOptional()
  @IsNumber()
  @Min(-90, { message: "Latitude must be ≥ -90" })
  @Max(90, { message: "Latitude must be ≤ 90" })
  lat: number | null;

  @IsOptional()
  @IsNumber()
  @Min(-180, { message: "Longitude must be ≥ -180" })
  @Max(180, { message: "Longitude must be ≤ 180" })
  long: number | null;
}
