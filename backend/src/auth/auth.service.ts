import { Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';  // Make sure this path is correct

@Injectable()
export class AuthService {
  register(registerDto: RegisterDto) {
    const email = registerDto.email.trim();
    const password = registerDto.password.trim();
    const passwordconfirm = registerDto.passwordconfirm.trim();

    if (password !== passwordconfirm) {
      return {
        success: false,
        message: 'Passwords do not match'
      };
    }

    return {
      success: true,
      message: 'User registered successfully',
      user: { email }
    };
  }
}
