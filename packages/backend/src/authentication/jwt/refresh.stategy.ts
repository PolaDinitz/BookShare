import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class RefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: "needToMakeThisEnvVarRefresh",
      passReqToCallback: true
    });
  }

  async validate(req : Request, payload: any) {
    const refreshToken = req.get('authorization').replace('Bearer', '').trim();
    return { userId: payload.sub, email: payload.email, role: payload.role, refreshToken: refreshToken };
  }
}