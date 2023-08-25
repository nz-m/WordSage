import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './entities/user.entity';
import { LoginDto, RegistrationDto } from './dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { UserToSend } from './interface/user.interface';
import { LoginRecord } from '../profile/entities/login-record.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
    @InjectModel(LoginRecord.name)
    private readonly loginRecordModel: Model<LoginRecord>,

    private jwtService: JwtService,
  ) {}

  async register(
    registrationDto: RegistrationDto,
  ): Promise<{ message: string }> {
    const { email, password, name } = registrationDto;

    const existingUser = await this.userModel.findOne({ email });
    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    try {
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password, salt);

      await this.userModel.create({
        email,
        password: hashedPassword,
        name,
      });

      return { message: 'User successfully registered' };
    } catch (error) {
      throw new InternalServerErrorException('User registration failed');
    }
  }

  async login(
    loginDto: LoginDto,
  ): Promise<{ token: string; user: UserToSend }> {
    const { email, password } = loginDto;

    const user = await this.userModel.findOne({ email });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await this.validatePassword(
      password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }

    const token = this.generateToken(user._id);

    const userToSend: UserToSend = {
      _id: user._id.toString(),
      email: user.email,
      name: user.name,
      level: user.level,
      isLevelAssessed: user.isLevelAssessed,
      isLearningStarted: user.isLearningStarted,
    };

    await this.updateUserStreak(user._id, new Date());

    return { token, user: userToSend };
  }

  private async validatePassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }

  private generateToken(userId: string): string {
    const payload = { _id: userId };
    return this.jwtService.sign(payload);
  }

  async updateUserStreak(userId: string, loginDate: Date) {
    let record = await this.loginRecordModel.findOne({ user: userId }).exec();

    if (!record) {
      record = new this.loginRecordModel({
        user: userId,
        lastLogin: loginDate,
        currentStreak: 1,
        longestStreak: 1,
      });
    }

    const lastLogin = record.lastLogin;

    if (lastLogin && this.isConsecutive(lastLogin, loginDate)) {
      record.currentStreak += 1;
      if (record.currentStreak > record.longestStreak) {
        record.longestStreak = record.currentStreak;
      }
    } else {
      record.currentStreak = 1;
    }

    record.lastLogin = loginDate;
    await record.save();
  }

  private isConsecutive(date1: Date, date2: Date): boolean {
    // Calculate the difference in milliseconds between the two dates
    const timeDifference = Math.abs(date2.getTime() - date1.getTime());

    // Calculate the difference in days
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

    // If the difference is exactly 1 day, the dates are consecutive
    return daysDifference === 1;
  }
}
