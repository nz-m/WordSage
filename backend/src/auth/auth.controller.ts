import { Controller, Post, Body, Patch, Param } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RegistrationDto, UpdateDto } from './dto';
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

  @Patch('level-assessment/:userId')
  update(
    @Param('userId') userId: string,
    @Body() updateDto: UpdateDto,
  ): Promise<UserToSend> {
    return this.authService.updateLevelAssessmentStatus(userId, updateDto);
  }
}
