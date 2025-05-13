import { ArgumentsHost } from "@nestjs/common";
import { AppException } from "src/common/exceptions/app.exception";

export interface ErrorCommand {
  supports(err: unknown): err is AppException;
  execute(err: AppException, host: ArgumentsHost): void;
}
