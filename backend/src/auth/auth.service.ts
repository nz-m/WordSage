import {
  Injectable,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../entities/user.entity';
import { Model } from 'mongoose';
import { RegistrationDto } from './dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
  ) {}

  async register(
    registrationDto: RegistrationDto,
  ): Promise<{ message: string }> {
    const { email, password, fullName } = registrationDto;

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
        fullName,
      });

      return { message: 'User successfully registered' };
    } catch (error) {
      throw new InternalServerErrorException('User registration failed');
    }
  }
}
