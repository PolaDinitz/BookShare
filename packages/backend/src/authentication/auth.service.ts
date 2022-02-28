import { Injectable } from '@nestjs/common';
import { UsersService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

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

    async login(user: any) {
      const payload = { email: user.email, sub: user.id, role: user.role};
      return {
        access_token: this.jwtService.sign(payload),
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role
      };
    }
}
