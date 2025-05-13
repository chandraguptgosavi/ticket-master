import { Response } from "express";
import { ErrorCommand } from "./i-error.command";
import { ArgumentsHost, HttpStatus } from "@nestjs/common";
import { AppException } from "src/common/exceptions/app.exception";

export class AppErrorCommand implements ErrorCommand {
  supports(err: unknown): err is any {
    return true;
  }
  execute(err: AppException, host: ArgumentsHost) {
    console.error("Generic Error Occured: ", err);
    const res = host.switchToHttp().getResponse<Response>();
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(
      err.getResponse
        ? err.getResponse()
        : {
            statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            errorCode: "UNEXPECTED_ERROR",
            message: "An unexpected error occurred",
          },
    );
  }
}
