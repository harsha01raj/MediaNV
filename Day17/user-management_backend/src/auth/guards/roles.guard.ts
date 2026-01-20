/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable prettier/prettier */
import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Role } from "../enum/role.enum";
import { ROLES_KEY } from "../decorators/roles.decorator";

@Injectable()
export class RoleGuard implements CanActivate {
    constructor(private reflector: Reflector) { }
    canActivate(context: ExecutionContext): boolean {
        const RequiredRoles = this.reflector.getAllAndOverride<Role[]>(
            ROLES_KEY,
            [context.getHandler(), context.getClass()]
        );
        if (!RequiredRoles) return true;
        const { user } = context.switchToHttp().getRequest();
        return RequiredRoles.includes(user.role);
    }
}