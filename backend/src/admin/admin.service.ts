import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { LessonProgress, WordProgress } from '../learn/entities';
import { LevelUpTestProgress } from '../level-up-test/entities';
import { QuizProgress } from '../quiz/entities';
import { User } from '../auth/entities/user.entity';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(LessonProgress.name)
    private readonly lessonProgressModel: Model<LessonProgress>,
    @InjectModel(User.name)
    private readonly userModel: Model<User>,

    @InjectModel(WordProgress.name)
    private readonly wordProgressModel: Model<WordProgress>,
    @InjectModel(LevelUpTestProgress.name)
    private readonly levelUpTestProgressModel: Model<LevelUpTestProgress>,
    @InjectModel(QuizProgress.name)
    private readonly quizProgressModel: Model<QuizProgress>,
  ) {}
  async getAllUsers(): Promise<any> {
    try {
      const users = await this.userModel.find().lean();

      return users.map((user) => {
        const { password, ...result } = user;
        return result;
      });
    } catch (error) {
      throw new InternalServerErrorException('Error getting all users');
    }
  }

  async markAllLessonsAsCompleted(
    userId: string,
    level: string,
  ): Promise<{ success: boolean; message: string }> {
    try {
      await this.lessonProgressModel.updateMany(
        { user: userId, level },
        { $set: { status: 'completed' } },
      );
      return { success: true, message: 'All lessons marked as completed' };
    } catch (error) {
      throw new InternalServerErrorException(
        'Error marking all lessons as completed',
      );
    }
  }

  async markAllLessonsAsNotCompleted(
    userId: string,
    level: string,
  ): Promise<{ success: boolean; message: string }> {
    try {
      await this.lessonProgressModel.updateMany(
        { user: userId, level },
        { $set: { isCompleted: false } },
      );
      return { success: true, message: 'All lessons marked as not completed' };
    } catch (error) {
      throw new InternalServerErrorException(
        'Error marking all lessons as not completed',
      );
    }
  }

  async updateUserLevel(
    userId: string,
    level: string,
  ): Promise<{ success: boolean; message: string }> {
    try {
      await this.userModel.updateOne({ _id: userId }, { $set: { level } });
      return { success: true, message: 'User level updated' };
    } catch (error) {
      throw new InternalServerErrorException('Error updating user level');
    }
  }

  async updateUserLevelAssessedStatus(
    userId: string,
    isLevelAssessed: boolean,
  ): Promise<{ success: boolean; message: string }> {
    try {
      await this.userModel.updateOne(
        { _id: userId },
        { $set: { isLevelAssessed } },
      );
      return { success: true, message: 'User level assessed status updated' };
    } catch (error) {
      throw new InternalServerErrorException(
        'Error updating user level assessed status',
      );
    }
  }

  async markALlWordsAsLearned(
    userId: string,
    level: string,
    lessonTitle: string,
  ): Promise<{ success: boolean; message: string }> {
    try {
      const words = await this.lessonProgressModel.find({
        level,
        lessonTitle,
      });

      const wordProgressPromises = words.map(async (word) => {
        const wordProgress = new this.wordProgressModel({
          level,
          user: new Types.ObjectId(userId),
          word: word._id,
          lessonTitle,
          isLearned: true,
        });
        await wordProgress.save();
      });

      await Promise.all(wordProgressPromises);

      return { success: true, message: 'All words marked as completed' };
    } catch (error) {
      throw new InternalServerErrorException(
        'Error marking all words as completed',
      );
    }
  }

  async removeTestRestriction(
    userId: string,
    level: string,
  ): Promise<{ success: boolean; message: string }> {
    try {
      await this.levelUpTestProgressModel.deleteOne({
        user: new Types.ObjectId(userId),
        level,
      });

      return { success: true, message: 'Test restriction removed' };
    } catch (error) {
      throw new InternalServerErrorException('Error removing test restriction');
    }
  }

  async removeQuizProgress(
    userId: string,
    level: string,
    lessonTitle: string,
  ): Promise<{ success: boolean; message: string }> {
    try {
      await this.quizProgressModel.deleteOne({
        user: new Types.ObjectId(userId),
        level,
        lessonTitle,
      });

      return { success: true, message: 'Quiz progress deleted' };
    } catch (error) {
      throw new InternalServerErrorException('Error deleting quiz progress');
    }
  }
}
