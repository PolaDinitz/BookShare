import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local/local.strategy';
import { UsersModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import {JwtStrategy} from './jwt/jwt.strategy'


@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: "needToMakeThisEnvVar",
      signOptions: { expiresIn: '1000s' },
    }),
  ],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,],
  exports: [AuthService],
})
export class AuthModule {}