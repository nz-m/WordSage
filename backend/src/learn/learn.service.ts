import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Lesson, Word, LessonProgress, WordProgress } from './entities';
import { Level, User } from '../auth/entities/user.entity';
import { LessonStatus } from './entities/lesson-progress.entity';
import { CreateLessonsDto } from './dto/create-lessons.dto';
import { LessonToSend } from './interface/lessonToSend.interface';
import { UserToSend } from '../auth/interface/user.interface';
import { AddWordDto } from './dto/add-word.dto';

@Injectable()
export class LearnService {
  constructor(
    @InjectModel(Lesson.name)
    private readonly lessonModel: Model<Lesson>,
    @InjectModel(Word.name)
    private readonly wordModel: Model<Word>,
    @InjectModel(WordProgress.name)
    private readonly wordProgressModel: Model<WordProgress>,
    @InjectModel(LessonProgress.name)
    private readonly lessonProgressModel: Model<LessonProgress>,
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
  ) {}

  async createLessons(
    lessons: CreateLessonsDto[],
  ): Promise<{ success: boolean; message: string }> {
    try {
      await this.lessonModel.create(lessons);
      return { success: true, message: 'Lessons created.' };
    } catch (error) {
      throw new BadRequestException("Couldn't create lessons.");
    }
  }

  async getLessons(userId: string): Promise<LessonToSend[]> {
    return await this.fetchLessonsWithProgress(userId);
  }

  async startLesson(
    userId: string,
    lessonId: string,
    level: string,
  ): Promise<LessonToSend[]> {
    try {
      const lessonProgress = await this.lessonProgressModel
        .findOne({ user: userId, lesson: lessonId, level: level })
        .exec();

      if (!lessonProgress) {
        throw new NotFoundException('Lesson progress not found');
      }

      if (lessonProgress.status === LessonStatus.COMPLETED) {
        throw new BadRequestException('Lesson already completed');
      }

      lessonProgress.status = LessonStatus.IN_PROGRESS;
      await lessonProgress.save();

      return await this.fetchLessonsWithProgress(userId);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Failed to start lesson');
    }
  }

  private async fetchLessonsWithProgress(
    userId: string,
  ): Promise<LessonToSend[]> {
    const lessons = await this.lessonModel
      .find()
      .sort({ lessonNumber: 1 })
      .exec();

    const lessonProgress = await this.lessonProgressModel
      .find({ user: userId })
      .populate('lesson')
      .exec();

    const lessonProgressMap = new Map();
    lessonProgress.forEach((progress) => {
      lessonProgressMap.set(progress.lesson.toString(), progress.status);
    });

    return lessons.map((lesson) => ({
      _id: lesson._id,
      title: lesson.title,
      lessonNumber: lesson.lessonNumber,
      icon: lesson.icon,
      description: lesson.description,
      status:
        lessonProgressMap.get(lesson._id.toString()) ||
        LessonStatus.NOT_STARTED,
    }));
  }

  /**
   * Assigns and initializes lessons for a user, marking the first lesson as not started and the rest as locked.
   *
   * @param {string} userId - The ID of the user.
   * @param {string} level - The level of the user.
   * @returns {Promise<{ user: UserToSend } | { message: string }>} - The updated user object or an error message.
   */
  async startLearning(
    userId: string,
    level: string,
  ): Promise<{ user: UserToSend } | { message: string }> {
    try {
      const lessons = await this.lessonModel.find().exec();

      const firstLesson = lessons.find((lesson) => lesson.lessonNumber === 1);

      if (!firstLesson) {
        return { message: 'First lesson not found.' };
      }

      await this.lessonProgressModel.create({
        user: userId,
        lesson: firstLesson._id,
        status: LessonStatus.NOT_STARTED,
        level: level,
      });

      const otherLessons = lessons.filter(
        (lesson) => lesson.lessonNumber !== 1,
      );

      await Promise.all(
        otherLessons.map((lesson) =>
          this.lessonProgressModel.create({
            user: userId,
            lesson: lesson._id,
            status: LessonStatus.LOCKED,
            level: level,
          }),
        ),
      );

      const result = await this.userModel
        .findByIdAndUpdate(userId, { isLearningStarted: true }, { new: true })
        .exec();

      const userToSend: UserToSend = {
        _id: result._id,
        email: result.email,
        name: result.name,
        level: result.level,
        isLevelAssessed: result.isLevelAssessed,
        isLearningStarted: result.isLearningStarted,
      };

      return { user: userToSend };
    } catch (error) {
      throw new BadRequestException("Couldn't start learning.");
    }
  }

  async addWords(
    words: AddWordDto[],
  ): Promise<{ success: boolean; message: string }> {
    try {
      await this.wordModel.create(words);
      return { success: true, message: 'Words created.' };
    } catch (error) {
      if (error.code === 11000) {
        return {
          success: false,
          message: 'Duplicate word found. Please check your input.',
        };
      }
      throw new BadRequestException("Couldn't add words.");
    }
  }

  async addWord(
    word: AddWordDto,
  ): Promise<{ success: boolean; message: string }> {
    try {
      await this.wordModel.create(word);
      return { success: true, message: 'Word created.' };
    } catch (error) {
      if (error.code === 11000) {
        return {
          success: false,
          message: 'Duplicate word found. Please check your input.',
        };
      }
      throw new BadRequestException("Couldn't add word.");
    }
  }

  async getWordsByLessonTitle(
    lessonTitle: string,
    userId: string,
  ): Promise<any> {
    const user = await this.userModel.findById(userId);

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    const words = await this.wordModel
      .find({
        lessonTitle: lessonTitle,
        level: user.level === Level.EXPERT ? Level.ADVANCED : user.level,
      })
      .sort({ wordNumber: 1 });

    const learnedWordIds = await this.wordProgressModel
      .find({
        user: userId,
        lessonTitle: lessonTitle,
        isLearned: true,
      })
      .lean()
      .exec();

    return words.map((word) => ({
      ...word.toObject(),
      isLearned: learnedWordIds.some(
        (learnedWord) => learnedWord.word.toString() === word._id.toString(),
      ),
    }));
  }

  async markWordAsLearned(
    userId: string,
    wordId: string,
    lessonTitle: string,
    isLearned: boolean,
    level: Level,
  ): Promise<{ success: boolean; message: string }> {
    try {
      let message: string;
      let success: boolean;

      const wordProgress = await this.wordProgressModel
        .findOneAndUpdate(
          {
            user: userId,
            word: wordId,
            level: level,
            lessonTitle: lessonTitle,
          },
          {
            $setOnInsert: {
              user: userId,
              word: wordId,
              level: level,
              lessonTitle: lessonTitle,
            },
          },
          { upsert: true, new: true },
        )
        .exec();

      if (wordProgress) {
        await wordProgress.updateOne({ isLearned });
        success = true;
        message = 'Word progress updated.';
      } else {
        success = true;
        message = 'Word progress created.';
      }

      return { success, message };
    } catch (error) {
      throw new InternalServerErrorException('Failed to update word progress');
    }
  }

  async markLessonAsCompleted(
    userId: string,
    lessonId: string,
    lessonNumber: string,
  ): Promise<LessonToSend[] | { success: boolean; message: string }> {
    try {
      const lessonProgress = await this.lessonProgressModel
        .findOne({ user: userId, lesson: lessonId })
        .exec();

      lessonProgress.status = LessonStatus.COMPLETED;
      await lessonProgress.save();

      // update the next lesson to be "not started"
      const nextLesson = await this.lessonModel
        .findOne({ lessonNumber: Number(lessonNumber) + 1 })
        .lean()
        .exec();

      if (nextLesson) {
        const nextLessonProgress = await this.lessonProgressModel
          .findOne({ user: userId, lesson: nextLesson._id })
          .exec();
        nextLessonProgress.status = LessonStatus.NOT_STARTED;
        await nextLessonProgress.save();
      }

      return await this.fetchLessonsWithProgress(userId);
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to mark lesson as completed',
      );
    }
  }
}
