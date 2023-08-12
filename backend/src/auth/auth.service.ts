import {
  Injectable,
  ConflictException,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './entities/user.entity';
import { LoginDto, RegistrationDto } from './dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { UserToSend } from './user.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
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
      // Hash the password
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
    };

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
}
