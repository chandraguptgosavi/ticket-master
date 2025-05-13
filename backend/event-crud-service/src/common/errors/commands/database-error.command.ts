import { ErrorCommand } from "./i-error.command";
import { DatabaseException } from "../../exceptions/database.exception";
import { ArgumentsHost } from "@nestjs/common";
import { Response } from "express";

export class DatabaseErrorCommand implements ErrorCommand {
  supports(err: unknown): err is DatabaseException {
    return err instanceof DatabaseException;
  }
  execute(err: DatabaseException, host: ArgumentsHost) {
    console.error("Database Error Occured: ", err);
    const res = host.switchToHttp().getResponse<Response>();
    res.status(err.getStatus()).json({
      statusCode: err.getStatus(),
      errorCode: err.errorCode,
      message: err.message,
    });
  }
}
