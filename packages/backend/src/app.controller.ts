import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './authentication/auth.service';
import { LocalAuthGuard } from './authentication/local/local-auth.guard';
import { JwtAuthGuard } from './authentication/jwt/jwt-auth.guard';
import { JwtRefreshAuthGuard } from './authentication/jwt/refresh.guard';
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
    return this.authService.logout(req.user.id);
  }

  @UseGuards(JwtRefreshAuthGuard)
  @Post('auth/refresh')
  async refreshTokens(@Request() req : any) {
    return this.authService.refreshTokens(req.user.id, req.user.refreshToken);
  }
}
