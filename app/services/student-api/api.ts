import { SheetsonApi, sheetsonApi } from '../sheetson';
import { CategoryService } from './category';
import { LessonService } from './lesson';
import { MentorService } from './mentor';
import { CourseService } from './source';
import { ReviewService } from './review';
import { InteractService } from './interact';

export class StudentApi {
  readonly sheetson: SheetsonApi
  readonly course: CourseService
  readonly mentor: MentorService
  readonly lesson: LessonService
  readonly category: CategoryService
  readonly review: ReviewService
  readonly user: MentorService
  readonly interact: InteractService

  /**
   * Set up our API instance. Keep this lightweight!
   */
  constructor(sheetsonApi: SheetsonApi) {
    this.sheetson = sheetsonApi
    this.course = new CourseService(sheetsonApi)
    this.mentor = new MentorService(sheetsonApi)
    this.lesson = new LessonService(sheetsonApi)
    this.category = new CategoryService(sheetsonApi)
    this.review = new ReviewService(sheetsonApi)
    this.user = new MentorService(sheetsonApi)
    this.interact = new InteractService(sheetsonApi)
  }
}

// Singleton instance of the StudentApi for convenience
export const api = new StudentApi(sheetsonApi)
