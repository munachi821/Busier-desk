import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class SessionGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    
    // Better-Auth expects standard Request object or headers
    const session = await this.authService.instance.api.getSession({
      headers: request.headers,
    });

    if (!session) {
      throw new UnauthorizedException('Session not found');
    }

    // Attach user and session to request for easy access
    request.user = session.user;
    request.session = session.session;

    return true;
  }
}
