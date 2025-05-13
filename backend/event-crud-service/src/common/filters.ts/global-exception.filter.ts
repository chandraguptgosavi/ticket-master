import { ExceptionFilter, Catch, ArgumentsHost } from "@nestjs/common";
import { DatabaseErrorCommand } from "../errors/commands/database-error.command";
import { ErrorCommand } from "../errors/commands/i-error.command";
import { AppErrorCommand } from "../errors/commands/app-error.command";
import { DomainErrorCommand } from "../errors/commands/domain-error.command";

@Catch()
export class GlobalExceptionsFilter implements ExceptionFilter {
  private commands: ErrorCommand[] = [
    new DatabaseErrorCommand(),
    new DomainErrorCommand(),
    new AppErrorCommand(),
  ];

  catch(exception: unknown, host: ArgumentsHost) {
    for (const cmd of this.commands) {
      if (cmd.supports(exception)) {
        return cmd.execute(exception, host);
      }
    }
  }
}
