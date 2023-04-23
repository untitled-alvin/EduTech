const en = {
  common: {
    ok: "OK!",
    cancel: "Cancel",
    back: "Back",
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
    all: "All",
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
    title: "Something went wrong!",
    friendlySubtitle:
      "This is the screen that your users will see in production when an error is thrown. You'll want to customize this message (located in `app/i18n/en.ts`) and probably the layout as well (`app/screens/ErrorScreen`). If you want to remove this entirely, check `app/app.tsx` for the <ErrorBoundary> component.",
    reset: "RESET APP",
    traceTitle: "Error from %{name} stack", // @demo remove-current-line
  },
  emptyStateComponent: {
    generic: {
      heading: "So empty... so sad",
      content: "No data found yet. Try clicking the button to refresh or reload the app.",
      button: "Let's try this again",
    },
  },
  errors: {
    invalidEmail: "Invalid email address.",
  },
  demoPodcastListScreen: {
    title: "React Native Radio episodes",
    onlyFavorites: "Only Show Favorites",
    favoriteButton: "Favorite",
    unfavoriteButton: "Unfavorite",
    accessibility: {
      cardHint:
        "Double tap to listen to the episode. Double tap and hold to {{action}} this episode.",
      switch: "Switch on to only show favorites",
      favoriteAction: "Toggle Favorite",
      favoriteIcon: "Episode not favorited",
      unfavoriteIcon: "Episode favorited",
      publishLabel: "Published {{date}}",
      durationLabel: "Duration: {{hours}} hours {{minutes}} minutes {{seconds}} seconds",
    },
    noFavoritesEmptyState: {
      heading: "This looks a bit empty",
      content:
        "No favorites have been added yet. Tap the heart on an episode to add it to your favorites!",
    },
  },
}

export default en
export type Translations = typeof en
