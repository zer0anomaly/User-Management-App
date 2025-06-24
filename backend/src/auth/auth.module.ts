import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]), // ⬅️ allows access to User in AuthService
    JwtModule.register({
      secret: 'your-secret-key',      // ⬅️ use process.env.JWT_SECRET in production
      signOptions: { expiresIn: '1h' }
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
