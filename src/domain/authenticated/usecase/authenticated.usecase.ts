import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { IClientRepository } from "src/infra/database/interface/client.interface";

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        @Inject('IClientRepository')
        private readonly repository: IClientRepository,
    ) {}
  
    async signIn(payload): Promise<any> {
      const { email, password } = payload;
      const user = await this.repository.findNickName(email);
      if (!user) {
        throw new UnauthorizedException('User or password divergente.');
      }

      if (user.password !== password) {
        throw new UnauthorizedException('User or password divergente.');
      }
      const { name, nick_name, createdAt, account_id } = user;
      const payloadJwt = {
        name,
        nick_name,
        createdAt,
        account_id
      }

      return {
        access_token: await this.jwtService.signAsync(payloadJwt),
      }
    }
  }
  