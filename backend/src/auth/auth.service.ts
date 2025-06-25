import { Injectable, UnauthorizedException } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from './user.entity'; // adjust path if needed
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async register(registerDto: RegisterDto) {
    const email = registerDto.email.trim();
    const password = registerDto.password.trim();
    const passwordconfirm = registerDto.passwordconfirm.trim();
    const name = registerDto.name?.trim(); // Assuming name is part of registerDto

    if (password !== passwordconfirm) {
      return {
        success: false,
        message: 'Passwords do not match',
      };
    }

    const existingUser = await this.userRepository.findOne({ where: { email } });
    if (existingUser) {
      return {
        success: false,
        message: 'Email already registered',
      };
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = this.userRepository.create({
      email,
      password: hashedPassword,
      name, // save name to DB
    });
    await this.userRepository.save(newUser);

    return {
      success: true,
      message: 'User registered successfully',
      user: { email: newUser.email, name: newUser.name },
    };
  }

  async login(email: string, password: string): Promise<{ token: string }> {
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }

    const payload = {
      sub: user.id,         // id as sub
      username: user.name,  // username used in JWT payload
      email: user.email,    // email included for frontend use
    };

    const token = this.jwtService.sign(payload);
    return { token };
  }
}
