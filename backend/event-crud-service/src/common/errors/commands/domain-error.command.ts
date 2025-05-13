import { ErrorCommand } from "./i-error.command";
import { ArgumentsHost } from "@nestjs/common";
import { Response } from "express";
import { DomainException } from "src/common/exceptions/domain.exception";

export class DomainErrorCommand implements ErrorCommand {
  supports(err: unknown): err is DomainException {
    return err instanceof DomainException;
  }
  execute(err: DomainException, host: ArgumentsHost) {
    console.error("Domain Error Occured: ", err);
    const res = host.switchToHttp().getResponse<Response>();
    res.status(err.getStatus()).json({
      statusCode: err.getStatus(),
      errorCode: err.errorCode,
      message: err.message,
    });
  }
}
