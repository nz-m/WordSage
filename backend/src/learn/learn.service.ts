import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import {
  Lesson,
  LessonProgress,
  PracticeQuiz,
  QuizProgress,
  QuizQuestion,
  Word,
  WordProgress,
} from './entities';
import { User } from '../auth/entities/user.entity';
import { LessonStatus } from './entities/lesson-progress.entity';
import { CreateLessonsDto } from './dto/create-lessons.dto';
import { LessonToSend } from './interface/lessonToSend.interface';
import { UserToSend } from '../auth/interface/user.interface';

@Injectable()
export class LearnService {
  constructor(
    @InjectModel(QuizQuestion.name)
    private quizQuestionModel: Model<QuizQuestion>,
    @InjectModel(Lesson.name)
    private lessonModel: Model<Lesson>,
    @InjectModel(PracticeQuiz.name)
    private practiceQuizModel: Model<PracticeQuiz>,
    @InjectModel(Word.name)
    private wordModel: Model<Word>,
    @InjectModel(QuizProgress.name)
    private quizProgressModel: Model<QuizProgress>,
    @InjectModel(WordProgress.name)
    private wordProgressModel: Model<WordProgress>,
    @InjectModel(LessonProgress.name)
    private lessonProgressModel: Model<LessonProgress>,
    @InjectModel(User.name)
    private userModel: Model<User>,
  ) {}

  async createLessons(
    lessons: CreateLessonsDto[],
  ): Promise<{ success: boolean; message: string }> {
    try {
      await this.lessonModel.create(lessons);
      return { success: true, message: 'Lessons created.' };
    } catch (error) {
      return { success: false, message: 'Error creating lessons.' };
    }
  }

  async getLessons(userId: string): Promise<LessonToSend[]> {
    const lessons = await this.lessonModel
      .find()
      .sort({ lessonNumber: 1 })
      .exec();

    const lessonProgress = await this.lessonProgressModel
      .find({ user: userId })
      .populate('lesson')
      .exec();

    // Create a mapping of lesson IDs to progress status
    const lessonProgressMap = new Map();
    lessonProgress.forEach((progress) => {
      lessonProgressMap.set(progress.lesson.toString(), progress.status);
    });

    // Combine lesson data with progress status
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
   * @returns {Promise<{ user: UserToSend } | { message: string }>} - The updated user object or an error message.
   */
  async startLearning(
    userId: string,
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
      return { message: 'Error starting lessons.' };
    }
  }
}
