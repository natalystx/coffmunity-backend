import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { expressjwt } from 'express-jwt';
import { ConfigService } from '@nestjs/config';
import { promisify } from 'util';
@Injectable()
export class AuthorizationGuard implements CanActivate {
  constructor(private configService: ConfigService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.getArgByIndex(0);
    const res = context.getArgByIndex(1);

    const checkJWT = promisify(
      expressjwt({
        secret: this.configService.get('AUTH0_SECRET'),
        issuer: this.configService.get('AUTH0_ISSUER_URL'),
        audience: this.configService.get('AUTH0_DOMAIN'),
        algorithms: ['RS256'],
      }),
    );

    try {
      await checkJWT(req, res);
      return true;
    } catch (err) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
  }
}
