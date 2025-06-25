import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller()
export class ProfileController {
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Req() req) {
    console.log('🔍 req.user:', req.user); // Debug output

    // Avoid crashing if user is missing
    if (!req.user || !req.user.name) {
      return { name: 'Unknown user' }; // Or throw 401 if you prefer
    }

    return { name: req.user.name };
  }
}
