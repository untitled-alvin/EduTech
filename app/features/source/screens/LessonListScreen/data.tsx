export type Section = {
  text: string
  duration: string
}

export type Lesson = {
  index: number
  locked?: boolean
  title: string
  duration: string
}


// 👇️ checks if obj has properties of Person
export function isSection(obj: Object): obj is Section {
  return 'text' in obj && 'duration' in obj
}

export function isLesson(obj: Object): obj is Lesson {
  return 'index' in obj && 'locked' in obj && 'title' in obj && 'duration' in obj
}

export const lessons: Lesson[] = [
  {
    index: 1,
    locked: false,
    title: "Set up Your Figma Account",
    duration: "5 mins"
  },
  {
    index: 2,
    locked: false,
    title: "Set up Your Figma Account",
    duration: "5 mins"
  },
  {
    index: 3,
    locked: false,
    title: "Take a Look Figma Interface",
    duration: "5 mins"
  },
  {
    index: 4,
    locked: false,
    title: "Working with Text & Grids",
    duration: "5 mins"
  },
  {
    index: 5,
    locked: false,
    title: "Using Figma Plugins",
    duration: "5 mins"
  },
  {
    index: 6,
    locked: false,
    title: "Let's Design a Sign-Up Form",
    duration: "5 mins"
  },
  {
    index: 7,
    locked: false,
    title: "Let's Create a Prototype",
    duration: "5 mins"
  },
  {
    index: 8,
    locked: false,
    title: "Sharing Work with Team",
    duration: "5 mins"
  },
  {
    index: 9,
    locked: false,
    title: "Exporting Assets",
    duration: "5 mins"
  }
]

export const lessonData: (Lesson | Section)[] = [
  { text: "Section 1 - Introduction", duration: "15 mins" },
  lessons[0],
  lessons[1],
  lessons[2],
  lessons[3],
  { text: "Section 2 - Figma Basic", duration: "60 mins" },
  lessons[0],
  lessons[1],
  lessons[2],
  lessons[3],
  { text: "Section 3 - Let's Practice", duration: "75 mins" },
  lessons[0],
  lessons[1],
  lessons[2],
  lessons[3],
  { text: "Section 4 - Let's Practice", duration: "75 mins" },
  lessons[0],
  lessons[1],
  lessons[2],
  lessons[3],
  { text: "Section 5 - Let's Practice", duration: "75 mins" },
  lessons[0],
  lessons[1],
  lessons[2],
  lessons[3],
]

