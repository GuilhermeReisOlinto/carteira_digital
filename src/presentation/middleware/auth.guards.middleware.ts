import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
      private readonly configService: ConfigService,
    ) {}
  
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
                
        const token = this.extractToken(request);
        
        const data_jwt = this.verifyToken(token)

        if (request.method === 'POST'){
            request.body.account_id = data_jwt.account_id;
        } else if (request.method === 'GET') {
            request.params.account_id = data_jwt.account_id;
        }

        return true;
    }
    
    private extractToken(request: any): string | null {
        const authHeader = request.headers.authorization;
    
        if (authHeader && authHeader.startsWith('Bearer ')) {
          return authHeader.slice(7);
        }

        return null;
    }

    private verifyToken(token: string): any {
        try {

            return jwt.verify(token, this.configService.get<string>('SECRET_JWT'));

        } catch (error) {
            throw new UnauthorizedException('Invalid token.');
        }
    }
}