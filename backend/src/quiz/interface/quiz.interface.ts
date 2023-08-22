export interface UserAnswer {
  questionId: string;
  userAnswer: string;
}

export interface Question {
  _id: string;
  question: string;
  answer: string;
  distractor1: string;
  distractor2: string;
  distractor3: string;
  level: string;
  lessonTitle: string;
  __v: number;
}

export interface QuizResult {
  _id: string;
  questions: Question[];
  userAnswers: UserAnswer[];
  timeTaken: string;
  score: number;
  startTime: string;
}
