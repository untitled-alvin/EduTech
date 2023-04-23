/**
 * The app navigator (formerly "AppNavigator" and "MainNavigator") is used for the primary
 * navigation flows of your app.
 * Generally speaking, it will contain an auth flow (registration, login, forgot password)
 * and a "main" flow which the user will use once logged in.
 */
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
  NavigatorScreenParams,
} from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { StackScreenProps } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"
import React, { useEffect } from "react"
import { useColorScheme } from "react-native"
import Config from "../config"
import { useStores } from "../models"
import {
  AddNewCardScreen,
  DemoScreen,
  CourseEnrollScreen,
  IntroScreen,
  LessonListScreen,
  PaymentScreen,
  CourseDetailScreen,
  CourseListScreen,
  CoursePlayScreen,
  Course,
  CourseModel,
} from "../features"
import { MentorListScreen, MentorProfileScreen } from "../features/mentor"
import { HomeNavigator, HomeTabParamList } from "./HomeNavigator"
import { navigationRef, useBackButtonHandler } from "./navigationUtilities"
import { EditProfileScreen, FillProfileScreen, LetsInScreen, SignInScreen, SignUpScreen } from "../features/auth"

const params: Course = CourseModel.create({
  "name": "Intro to UI/UX Design",
  "keyword": "Human Computer Interaction, User Experience, User Experience Design, Design and Product, Research and Design, Web Design, Web Development, Collaboration, Computer Science, Leadership and Management, Market Research, Software Engineering, Software Testing, User Research, Web Development Tools, Brand Management, Change Management, Communication, Computer Graphics, Computer Programming, Emotional Intelligence, Entrepreneurship, Interactive Design, Marketing, Marketing Design, Planning, Problem Solving, Product Design, Professional Development, Programming Principles, Social Media, Accounting, Business Analysis, Business Communication, Business Psychology, Data Analysis, Finance, Financial Analysis, Investment Management, Operating Systems, Software Architecture, Supply Chain and Logistics, Systems Design, Theoretical Computer Science, Visual Design",
  "description": "Human Computer Interaction, User Experience, User Experience Design, Design and Product, Research and Design, Web Design, Web Development, Collaboration, Computer Science, Leadership and Management, Market Research, Software Engineering, Software Testing, User Research, Web Development Tools, Brand Management, Change Management, Communication, Computer Graphics, Computer Programming, Emotional Intelligence, Entrepreneurship, Interactive Design, Marketing, Marketing Design, Planning, Problem Solving, Product Design, Professional Development, Programming Principles, Social Media, Accounting, Business Analysis, Business Communication, Business Psychology, Data Analysis, Finance, Financial Analysis, Investment Management, Operating Systems, Software Architecture, Supply Chain and Logistics, Systems Design, Theoretical Computer Science, Visual Design",
  "category": "UI/UX Design",
  "original_price": 75,
  "promotion_price": 30,
  "country": "",
  "duration": "4.5",
  "certificate": true,
  "intro": "",
  "banner": "https://sheetson.com/images/sheet2api.png",
  "id": "2"
})

/**
 * This type allows TypeScript to know what routes are defined in this navigator
 * as well as what properties (if any) they might take when navigating to them.
 *
 * If no params are allowed, pass through `undefined`. Generally speaking, we
 * recommend using your MobX-State-Tree store(s) to keep application state
 * rather than passing state through navigation params.
 *
 * For more information, see this documentation:
 *   https://reactnavigation.org/docs/params/
 *   https://reactnavigation.org/docs/typescript#type-checking-the-navigator
 *   https://reactnavigation.org/docs/typescript/#organizing-types
 */
export type AppStackParamList = {
  // 🔥 Your screens go here
  Intro: undefined
  LetsIn: undefined
  SignUp: undefined
  SignIn: undefined

  // HOME
  HomeTab: NavigatorScreenParams<HomeTabParamList>

  // PROFILE
  FillProfile: undefined
  EditProfile: undefined

  // COURSE
  CourseDetail: undefined | Course
  CourseEnroll: undefined
  CourseList: undefined
  CoursePlay: undefined
  LessonList: undefined

  // MENTOR
  MentorList: undefined
  MentorProfile: undefined
  // Payment
  Payment: undefined
  AddNewCard: undefined

  Demo: undefined
}

/**
 * This is a list of all the route names that will exit the app if the back button
 * is pressed while in that screen. Only affects Android.
 */
const exitRoutes = Config.exitRoutes

export type AppStackScreenProps<T extends keyof AppStackParamList> = StackScreenProps<
  AppStackParamList,
  T
>

// Documentation: https://reactnavigation.org/docs/stack-navigator/
const Stack = createNativeStackNavigator<AppStackParamList>()

const AppStack = observer(function AppStack() {
  const {
    isIntroComplete,
    authenticationStore: { isAuthenticated },
  } = useStores()

  useEffect(() => { }, [])

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* <Stack.Screen name="Demo" component={DemoScreen} /> */}
      {/* <Stack.Screen name="Intro" component={IntroScreen} /> */}
      {/* <Stack.Screen name="LetsIn" component={LetsInScreen} /> */}
      {/* <Stack.Screen name="SignUp" component={SignUpScreen} /> */}
      {/* <Stack.Screen name="SignIn" component={SignInScreen} /> */}
      {/* <Stack.Screen name="FillProfile" component={FillProfileScreen} /> */}
      <Stack.Screen name="HomeTab" component={HomeNavigator} />
      {/* <Stack.Screen name="MentorList" component={MentorListScreen} /> */}
      {/* <Stack.Screen name="MentorProfile" component={MentorProfileScreen} /> */}
      {/* <Stack.Screen name="CourseList" component={CourseListScreen} /> */}
      {/* <Stack.Screen name="EditProfile" component={EditProfileScreen} /> */}
      {/* <Stack.Screen name="Payment" component={PaymentScreen} /> */}
      {/* <Stack.Screen name="AddNewCard" component={AddNewCardScreen} /> */}
      {/* <Stack.Screen name="LessonList" component={LessonListScreen} /> */}
      <Stack.Screen name="CourseDetail" component={CourseDetailScreen} initialParams={params} />
      {/* <Stack.Screen name="CourseEnroll" component={CourseEnrollScreen} /> */}
      {/* <Stack.Screen name="CoursePlay" component={CoursePlayScreen} /> */}
    </Stack.Navigator>
  )

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}
    // initialRouteName={"MentorList"}
    // initialRouteName={"Intro"}
    // initialRouteName={isAuthenticated ? "HomeTab" : "Intro"}
    // initialRouteName={isAuthenticated ? "HomeTab" : "Intro"}
    // initialRouteName={isAuthenticated ? "HomeTab" : (isIntroComplete ? "Intro" : "LetsIn")}
    >
      {isAuthenticated ? (
        <>
          <Stack.Screen name="HomeTab" component={HomeNavigator} />
          <Stack.Screen name="FillProfile" component={FillProfileScreen} />
          <Stack.Screen name="MentorList" component={MentorListScreen} />
          <Stack.Screen name="CourseList" component={CourseListScreen} />
          <Stack.Screen name="CoursePlay" component={CoursePlayScreen} />
          <Stack.Screen name="LessonList" component={LessonListScreen} />
          <Stack.Screen name="CourseDetail" component={CourseDetailScreen} />
          <Stack.Screen name="CourseEnroll" component={CourseEnrollScreen} />
          <Stack.Screen name="EditProfile" component={EditProfileScreen} />
          <Stack.Screen name="Payment" component={PaymentScreen} />
          <Stack.Screen name="AddNewCard" component={AddNewCardScreen} />
          <Stack.Screen name="MentorProfile" component={MentorProfileScreen} />
        </>
      ) :
        isIntroComplete ? (
          <>
            <Stack.Screen name="LetsIn" component={LetsInScreen} />
            <Stack.Screen name="SignUp" component={SignUpScreen} />
            <Stack.Screen name="SignIn" component={SignInScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="Intro" component={IntroScreen} />
            <Stack.Screen name="LetsIn" component={LetsInScreen} />
            <Stack.Screen name="SignUp" component={SignUpScreen} />
            <Stack.Screen name="SignIn" component={SignInScreen} />
          </>
        )

      }
    </Stack.Navigator>
  )
})

interface NavigationProps extends Partial<React.ComponentProps<typeof NavigationContainer>> { }

export const AppNavigator = observer(function AppNavigator(props: NavigationProps) {
  const colorScheme = useColorScheme()

  useBackButtonHandler((routeName) => exitRoutes.includes(routeName))

  return (
    <NavigationContainer
      ref={navigationRef}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
      {...props}
    >
      <AppStack />
    </NavigationContainer>
  )
})

