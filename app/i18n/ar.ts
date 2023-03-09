import { Translations } from "./en"

const ar: Translations = {
  common: {
    ok: "نعم",
    cancel: "حذف",
    back: "خلف",
    logOut: "Log Out",
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
  source: {
    mostPopularCourses: "Most Popular Courses",
    enrollCourse: "Enroll Course",
    enrollSuccess: "You have successfully made payment and enrolled the course.",
  },
  profileScreen: {
    logoutQuestion: "Are you sure you want to log out?",
    logoutConfirm: "Yes, Logout",
  },
  topMentorsScreen: {
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
    title: "هناك خطأ ما",
    friendlySubtitle:
      "هذه هي الشاشة التي سيشاهدها المستخدمون في عملية الانتاج عند حدوث خطأ. سترغب في تخصيص هذه الرسالة ( الموجودة في 'ts.en/i18n/app') وربما التخطيط ايضاً ('app/screens/ErrorScreen'). إذا كنت تريد إزالة هذا بالكامل، تحقق من 'app/app.tsp' من اجل عنصر <ErrorBoundary>.",
    reset: "اعادة تعيين التطبيق",
    traceTitle: "خطأ من مجموعة %{name}", // @demo remove-current-line
  },
  emptyStateComponent: {
    generic: {
      heading: "فارغة جداً....حزين",
      content: "لا توجد بيانات حتى الآن. حاول النقر فوق الزر لتحديث التطبيق او اعادة تحميله.",
      button: "لنحاول هذا مرّة أخرى",
    },
  },
  // @demo remove-block-start
  errors: {
    invalidEmail: "عنوان البريد الالكتروني غير صالح",
  },
  demoPodcastListScreen: {
    title: "حلقات إذاعية React Native",
    onlyFavorites: "المفضلة فقط",
    favoriteButton: "المفضل",
    unfavoriteButton: "غير مفضل",
    accessibility: {
      cardHint: "انقر مرّتين للاستماع على الحلقة. انقر مرّتين وانتظر لتفعيل {{action}} هذه الحلقة.",
      switch: "قم بالتبديل لاظهار المفضّلة فقط.",
      favoriteAction: "تبديل المفضلة",
      favoriteIcon: "الحلقة الغير مفضّلة",
      unfavoriteIcon: "الحلقة المفضّلة",
      publishLabel: "نشرت {{date}}",
      durationLabel: "المدّة: {{hours}} ساعات {{minutes}} دقائق {{seconds}} ثواني",
    },
    noFavoritesEmptyState: {
      heading: "هذا يبدو فارغاً بعض الشيء.",
      content:
        "لم تتم اضافة اي مفضلات حتى الان. اضغط على القلب في إحدى الحلقات لإضافته الى المفضلة.",
    },
  },
}

export default ar
