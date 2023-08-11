import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RegistrationDto } from './dto';
import { UserToSend } from './user.interface';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  signUp(
    @Body() registrationDto: RegistrationDto,
  ): Promise<{ message: string }> {
    return this.authService.register(registrationDto);
  }

  @Post('login')
  signIn(
    @Body() signInDto: LoginDto,
  ): Promise<{ token: string; user: UserToSend }> {
    return this.authService.login(signInDto);
  }
}
