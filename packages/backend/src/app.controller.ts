import { Controller, Post, Request, UseGuards} from '@nestjs/common';
import { AuthService } from './modules/authentication/auth.service';
import { LocalAuthGuard } from './modules/authentication/local/local-auth.guard';
import { JwtAuthGuard } from './modules/authentication/jwt/jwt-auth.guard';
import { JwtRefreshAuthGuard } from './modules/authentication/jwt/refresh.guard';

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req : any) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Post('auth/logout')
  async logout(@Request() req : any) {
    return this.authService.logout(req.user.userId);
  }

  @UseGuards(JwtRefreshAuthGuard)
  @Post('auth/refresh')
  async refreshTokens(@Request() req : any) {
    return this.authService.refreshTokens(req.user.userId, req.user.refreshToken);
  }
}
