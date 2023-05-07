import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { firebaseApp } from './constants/firebaseConfig';
import { App } from 'firebase-admin/app';
import { GqlExecutionContext } from '@nestjs/graphql';
import { getAuth } from 'firebase-admin/auth';

@Injectable()
export class AuthorizationGuard implements CanActivate {
  private firebaseApp: App;
  constructor() {
    this.firebaseApp = firebaseApp;
  }
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const graphqlContext = GqlExecutionContext.create(context);
    const token = graphqlContext.getContext().req.headers.authorization;
    console.log(token);

    try {
      await getAuth(this.firebaseApp).verifyIdToken(token, true);
      return true;
    } catch (err) {
      console.log(err);

      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
  }
}
