import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './authentication/auth.service';
import { LocalAuthGuard } from './authentication/local/local-auth.guard';

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req : any) {
    return this.authService.login(req.user);
  }
}
