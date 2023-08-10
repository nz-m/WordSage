import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from '../entities/user.entity';
import { LoginDto, RegistrationDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  signUp(
    @Body() registrationDto: RegistrationDto,
  ): Promise<{ message: string }> {
    return this.authService.register(registrationDto);
  }

  // @Post('login')
  // signIn(@Body() signInDto: LoginDto): Promise<{ token: string; user: User }> {
  //   return this.authService.signIn(signInDto);
  // }
}