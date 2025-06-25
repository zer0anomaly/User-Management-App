// src/auth/jwt.strategy.ts
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'your_jwt_secret', // Make sure this matches what's in your JwtModule
    });
  }

  async validate(payload: any) {
    console.log('✅ Decoded payload:', payload);

    return {
      id: payload.sub,
      name: payload.username, // 👈 used in req.user.name
      email: payload.email     // 👈 used in req.user.email
    };
  }
}
