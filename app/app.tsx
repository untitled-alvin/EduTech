/**
 * Welcome to the main entry point of the app. In this file, we'll
 * be kicking off our app.
 *
 * Most of this file is boilerplate and you shouldn't need to modify
 * it very often. But take some time to look through and understand
 * what is going on here.
 *
 * The app navigation resides in ./app/navigators, so head over there
 * if you're interested in adding screens and navigators.
 */
import "./i18n"
import "./utils/ignoreWarnings"
import { useFonts } from "expo-font"
import React from "react"
import { initialWindowMetrics, SafeAreaProvider } from "react-native-safe-area-context"
import * as Linking from "expo-linking"
import { useInitialRootStore } from "./models"
import { AppNavigator, useNavigationPersistence } from "./navigators"
import { ErrorBoundary } from "./features/error/ErrorBoundary"
import * as storage from "./utils/storage"
import { customFontsToLoad } from "./components/ui-kit/theme"
import { setupReactotron } from "./services/reactotron"
import Config from "./config"
import { LoadingProvider } from "./services/loading"
import appConfig from "../tamagui.config"
import { TamaguiProvider, Theme, ThemeName } from 'tamagui'
import { useColorScheme } from "react-native"

// Set up Reactotron, which is a free desktop app for inspecting and debugging
// React Native apps. Learn more here: https://github.com/infinitered/reactotron
setupReactotron({
  // clear the Reactotron window when the app loads/reloads
  clearOnLoad: true,
  // generally going to be localhost
  host: "localhost",
  // Reactotron can monitor AsyncStorage for you
  useAsyncStorage: true,
  // log the initial restored state from AsyncStorage
  logInitialState: true,
  // log out any snapshots as they happen (this is useful for debugging but slow)
  logSnapshots: false,
})

export const NAVIGATION_PERSISTENCE_KEY = "NAVIGATION_STATE"

// Web linking configuration
const prefix = Linking.createURL("/")
const config = {
  screens: {
    SignIn: {
      path: "",
    },
    Intro: "intro",
    LetsIn: "lets-in",
    HomeTab: {
      screens: {
        Home: "home",
        Profile: "profile",
      },
    },
  },
}

interface AppProps {
  hideSplashScreen: () => Promise<void>
}

/**
 * This is the root component of our app.
 */
function App(props: AppProps) {
  const { hideSplashScreen } = props
  const {
    initialNavigationState,
    onNavigationStateChange,
    isRestored: isNavigationStateRestored,
  } = useNavigationPersistence(storage, NAVIGATION_PERSISTENCE_KEY)

  const colorScheme = useColorScheme()
  const [areFontsLoaded] = useFonts(customFontsToLoad)

  const { rehydrated, rootStore } = useInitialRootStore(() => {
    // This runs after the root store has been initialized and rehydrated.

    // If your initialization scripts run very fast, it's good to show the splash screen for just a bit longer to prevent flicker.
    // Slightly delaying splash screen hiding for better UX; can be customized or removed as needed,
    // Note: (vanilla Android) The splash-screen will not appear if you launch your app via the terminal or Android Studio. Kill the app and launch it normally by tapping on the launcher icon. https://stackoverflow.com/a/69831106
    // Note: (vanilla iOS) You might notice the splash-screen logo change size. This happens in debug/development mode. Try building the app for release.

    // You can hide splash screen after restore session or any where
    rootStore.authenticationStore.restoreSession().then((_) => hideSplashScreen())
    // setTimeout(hideSplashScreen, 500)
  })


  // Before we show the app, we have to wait for our state to be ready.
  // In the meantime, don't render anything. This will be the background
  // color set in native by rootView's background color.
  // In iOS: application:didFinishLaunchingWithOptions:
  // In Android: https://stackoverflow.com/a/45838109/204044
  // You can replace with your own loading component if you wish.
  if (!rehydrated || !isNavigationStateRestored || !areFontsLoaded) return null

  const linking = { prefixes: [prefix], config }
  const theme: ThemeName = colorScheme === "dark" ? "dark" : "light"
  // const theme: ThemeName = "dark"
  // const theme: ThemeName = "light"

  // otherwise, we're ready to render the app
  return (
    <TamaguiProvider config={appConfig}>
      <Theme name={theme}>
        <SafeAreaProvider initialMetrics={initialWindowMetrics}>
          <ErrorBoundary catchErrors={Config.catchErrors}>
            <AppNavigator
              linking={linking}
              initialState={initialNavigationState}
              onStateChange={onNavigationStateChange}
            />
            <LoadingProvider />
          </ErrorBoundary>
        </SafeAreaProvider>
      </Theme>
    </TamaguiProvider>
  )
}

export default App

