import { AppException } from "./app.exception";
import { HttpStatus } from "@nestjs/common";

export class DatabaseException extends AppException {
  readonly errorCode = "DB_ERROR";

  constructor(original: Error) {
    super("A database error occurred", HttpStatus.INTERNAL_SERVER_ERROR);
    this.stack = original.stack;
  }
}
