import { Controller, Get, Req } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { AuthGuard } from '@nestjs/passport';
import { UseGuards } from '@nestjs/common';
import { UserStatsDto } from './dto/user-stats.dto';
import { UserToSend } from '../auth/interface/user.interface';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Profile')
@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @UseGuards(AuthGuard())
  @Get('user-info')
  getUserInfo(@Req() req): Promise<UserToSend> {
    return this.profileService.getUserInfo(req.user._id);
  }

  @UseGuards(AuthGuard())
  @Get('stats')
  getUserStats(@Req() req): Promise<UserStatsDto> {
    return this.profileService.getUserStats(req.user._id);
  }
}
