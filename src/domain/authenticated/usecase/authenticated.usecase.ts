import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { IClientRepository } from "src/infra/database/interface/client.interface";

@Injectable()
export class AuthService {
    constructor(
        @Inject('IClientRepository')
        private readonly repository: IClientRepository,
    ) {}
  
    async signIn(username: string, pass: string): Promise<any> {
      const user = await this.repository.findOne(username);
     
      if (user?.password !== pass) {
        throw new UnauthorizedException();
      }
      const { password, ...result } = user;
      // TODO: Generate a JWT and return it here
      // instead of the user object
      return result;
    }
  }
  