import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { LevelAssessmentModule } from './level-assessment/level-assessment.module';
import { LearnModule } from './learn/learn.module';
import { LoggerMiddleware, DelayMiddleware } from './middleware';
import { QuizModule } from './quiz/quiz.module';
import { LevelUpTestModule } from './level-up-test/level-up-test.module';
import { ProfileModule } from './profile/profile.module';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),

    MongooseModule.forRoot(process.env.MONGO_URI),
    AuthModule,
    LevelAssessmentModule,
    LearnModule,
    QuizModule,
    LevelUpTestModule,
    ProfileModule,
    AdminModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware, DelayMiddleware).forRoutes('*');
    // consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
