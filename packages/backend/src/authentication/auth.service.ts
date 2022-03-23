import { Injectable , UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Payload } from '../interfaces/payload.interface';
import { ResponsePayload } from 'src/interfaces/responsePayload.interface';

@Injectable()
export class AuthService {

    constructor(
      private usersService: UsersService,
      private jwtService: JwtService
      ) {}

    public async validateUser(email: string, password : string): Promise<any> {
        const user = await this.usersService.getUserByEmail(email);
        if (user && await bcrypt.compare(password, user.password)) {
          return user;
        }
        return null;
    }

    async login(user: any) : Promise<ResponsePayload> {
      const payload = { email: user.email, sub: user.id, role: user.role};
      const {refresh_token, access_token} = this.getTokens(payload);
      await this.usersService.updateRefreshToken(user.id, refresh_token);
      return {
        access_token: access_token,
        refresh_token: refresh_token,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        imageUrl: user.imageUrl
      };
    }

    private getTokens(payload : Payload) : { refresh_token : string, access_token: string } {
      return {
        refresh_token: this.jwtService.sign(payload, {
          secret: "needToMakeThisEnvVarRefresh",
          expiresIn: 60 * 60 * 24 * 7
        }),
        access_token: this.jwtService.sign(payload, {
          secret: "needToMakeThisEnvVar",
          expiresIn: 60 * 15,
        })
      }
    }

    async refreshTokens(userId: string, request_refresh_token: string) : Promise<ResponsePayload> {
      const user = await this.usersService.getUserById(userId);
      if (!user || !(await bcrypt.compare(request_refresh_token, user.refreshToken))) {
        throw new UnauthorizedException();
      }
      const payload = { email: user.email, sub: userId, role: user.role};
      const {refresh_token, access_token } = this.getTokens(payload)
      await this.usersService.updateRefreshToken(user.id, refresh_token);
      return {
        access_token: access_token,
        refresh_token: refresh_token,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        imageUrl: user.imageUrl
      };
    }

    async logout(userId : string) {
      return await this.usersService.updateRefreshToken(userId, null);
    }
}
