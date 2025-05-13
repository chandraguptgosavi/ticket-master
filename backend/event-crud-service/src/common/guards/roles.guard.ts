import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { ROLES_KEY } from "../decorators/roles.decorator";
import { Request } from "express";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<string[]>(
      ROLES_KEY,
      context.getHandler(),
    );
    if (!requiredRoles) {
      return true;
    }

    const headers = context.switchToHttp().getRequest<Request>().headers;
    const roles =
      (headers["x-user-roles"] as string)?.split(",")?.map((r) => {
        const role = r.trim();
        return role.toLowerCase();
      }) || [];

    const hasRole = requiredRoles.some((role) => roles.includes(role));

    if (!hasRole) {
      throw new ForbiddenException(
        `Required roles: [${requiredRoles.join(", ")}]`,
      );
    }

    return true;
  }
}
