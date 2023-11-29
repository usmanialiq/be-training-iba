import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from './auth.decorator';
import { Role } from '../common/role.enum';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  async canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    // ignore for public routes
    if (isPublic) {
      return true;
    }

    const baseGuard = await super.canActivate(context);
    if (!baseGuard) {
      return false;
    }

    const requiredRoles = this.reflector.getAllAndOverride<Role[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (requiredRoles.length) {
      const { user } = context.switchToHttp().getRequest();
      if (!user) {
        throw new UnauthorizedException();
      }
      if (requiredRoles.includes(Role.All)) {
        return true;
      }
      return requiredRoles.some((type: string) => user.role?.includes(type));
    }
    return false;
  }
}
