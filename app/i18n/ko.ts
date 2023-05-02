import { Translations } from "./en"

const ko: Translations = {
  common: {
    ok: "확인!",
    cancel: "취소",
    back: "뒤로",
    logOut: "로그아웃",
    next: "Next",
    signIn: "Sign in",
    signUp: "Sign up",
    continue: "Continue",
    email: "Email",
    password: "Password",
    fullName: "Full Name",
    nickname: "Nickname",
    dateOfBirth: "Date of Birth",
    phoneNumber: "Phone Number",
    gender: "Gender",
    or: "Or",
    congratulations: "Congratulations",
    edit: "Edit",
    profile: "Profile",
    payment: "Payment",
    occupation: "Occupation",
    update: "Update",
    country: "Country",
    user: "User",
    about: "About",
    mentor: "Mentor",
    course: "Course",
    courses: "Courses",
    tools: "Tools",
    lessons: "Lessons",
    successful: "Successful",
    view: "View",
    eReceipt: "E-Receipt",
    reviews: "Reviews",
    students: "Students",
    hours: "Hours",
    certificate: "Certificate",
    connected: "Connected",
    message: "Message",
    website: "Website",
    home: "Home",
    all: "All",
    section: "Section",
  },
  payment: {
    addNewCard: "Add New Card",
    selectPaymentText: "Select the payment method you want to use",
    cardName: "Card Name",
    cardNumber: "Card Number",
    expiryDate: "Expiry Date",
    cvv: "CVV",
  },
  homeScreen: {
    header: "Good Morning 👋",
  },
  course: {
    mostPopularCourses: "Most Popular Courses",
    enrollCourse: "Enroll Course",
    enrollSuccess: "You have successfully made payment and enrolled the course.",
  },
  profileScreen: {
    logoutQuestion: "Are you sure you want to log out?",
    logoutConfirm: "Yes, Logout",
  },
  mentor: {
    topMentors: "Top Mentors",
  },
  letsIn: {
    letSYouIn: "Let's you in",
    continueWithGoogle: "Continue with Google",
    signInWithPassword: "Sign in with password",
    alreadyHaveAnAccount: "Already have an account?",
    rememberMe: "Remember me",
    donTHaveAnAccount: "Don't have an account?",
    createYourAccount: "Create your Account",
    loginToYourAccount: "Login to your Account",
    orContinueWith: "or continue with",
    forgotThePassword: "Forgot the password?",
  },
  fillProfileScreen: {
    fillYourProfile: "Fill Your Profile",
  },
  editProfileScreen: {
    header: "Edit Profile",
  },
  introScreen: {
    mess1: "We provide the best learning courses & great mentors!",
    mess2: "Learn anytime and anywhere easily and conveniently",
    mess3: "Let's improve your skills together with Elera right now!",
    getStarted: "Get Started",
  },
  errorScreen: {
    title: "뭔가 잘못되었습니다!",
    friendlySubtitle:
      "이 화면은 오류가 발생할 때 프로덕션에서 사용자에게 표시됩니다. 이 메시지를 커스터마이징 할 수 있고(해당 파일은 `app/i18n/ko.ts` 에 있습니다) 레이아웃도 마찬가지로 수정할 수 있습니다(`app/screens/error`). 만약 이 오류화면을 완전히 없에버리고 싶다면 `app/app.tsx` 파일에서 <ErrorBoundary> 컴포넌트를 확인하기 바랍니다.",
    reset: "초기화",
    traceTitle: "%{name} 스택에서의 오류", // @demo remove-current-line
  },
  emptyStateComponent: {
    generic: {
      heading: "너무 텅 비어서.. 너무 슬퍼요..",
      content: "데이터가 없습니다. 버튼을 눌러서 리프레쉬 하시거나 앱을 리로드하세요.",
      button: "다시 시도해봅시다",
    },
  },
  errors: {
    invalidEmail: "잘못된 이메일 주소 입니다.",
  },
  demoPodcastListScreen: {
    title: "React Native 라디오 에피소드",
    onlyFavorites: "즐겨찾기만 보기",
    favoriteButton: "즐겨찾기",
    unfavoriteButton: "즐겨찾기 해제",
    accessibility: {
      cardHint:
        "에피소드를 들으려면 두 번 탭하세요. 이 에피소드를 좋아하거나 싫어하려면 두 번 탭하고 길게 누르세요.",
      switch: "즐겨찾기를 사용하려면 스위치를 사용하세요.",
      favoriteAction: "즐겨찾기 토글",
      favoriteIcon: "좋아하는 에피소드",
      unfavoriteIcon: "즐겨찾기하지 않은 에피소드",
      publishLabel: "{{date}} 에 발행됨",
      durationLabel: "소요시간: {{hours}}시간 {{minutes}}분 {{seconds}}초",
    },
    noFavoritesEmptyState: {
      heading: "조금 텅 비어 있네요.",
      content: "즐겨찾기가 없습니다. 에피소드에 있는 하트를 눌러서 즐겨찾기에 추가하세요.",
    },
  },
  // @demo remove-block-end
}

export default ko
