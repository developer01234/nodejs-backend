import { JwtService } from "@nestjs/jwt";
import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { Observable } from "rxjs";
import { Reflector } from "@nestjs/core";
import { ROLES_KEY } from "./roles.decorator";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private jwtService: JwtService, private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();

    try {
      const reqRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
        context.getHandler(),
        context.getClass(),
      ]);
      if (!reqRoles) {
        return true;
      }
      const header = req.headers.authorization;
      const bearer = header.split(" ")[0];
      const token = header.split(" ")[1];

      if (bearer !== "Bearer" || !token) {
        throw new UnauthorizedException({ message: "User not SignIn" });
      }

      const user = this.jwtService.verify(token);
      req.user = user;
      return user.roles.some((role) => reqRoles.includes(role.value));
    } catch (e) {
      throw new HttpException("Ты че пес?", HttpStatus.FORBIDDEN);
    }
  }
}
