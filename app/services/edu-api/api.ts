import { SheetsonApi, sheetsonApi } from '../sheetson';
import { CategoryRepo } from './category';
import { LessonRepo } from './lesson';
import { MentorRepo } from './mentor';
import { CourseRepo } from './source';


export class EduApi {
  readonly sheetsonApi: SheetsonApi
  readonly category: CategoryRepo
  readonly course: CourseRepo
  readonly mentor: MentorRepo
  readonly lesson: LessonRepo

  /**
   * Set up our API instance. Keep this lightweight!
   */
  constructor(sheetsonApi: SheetsonApi) {
    this.sheetsonApi = sheetsonApi
    this.category = new CategoryRepo(sheetsonApi)
    this.course = new CourseRepo(sheetsonApi)
    this.mentor = new MentorRepo(sheetsonApi)
    this.lesson = new LessonRepo(sheetsonApi)
  }
}

// Singleton instance of the EduApi for convenience
export const eduApi = new EduApi(sheetsonApi)
