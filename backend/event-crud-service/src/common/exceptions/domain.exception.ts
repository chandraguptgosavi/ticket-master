import { AppException } from "./app.exception";
import { HttpStatus } from "@nestjs/common";

export class DomainException extends AppException {
  readonly errorCode = "DOMAIN_ERROR";
  constructor(message: string) {
    super(message, HttpStatus.UNPROCESSABLE_ENTITY);
  }
}
