// TODO: write documentation about fonts and typography along with guides on how to add custom fonts in own
// markdown file and add links from here

import { Platform } from "react-native"
import {
  // Urbanist_300Light as urbanistLight,
  // Urbanist_400Regular as urbanistRegular,
  // Urbanist_500Medium as urbanistMedium,
  // Urbanist_600SemiBold as urbanistSemiBold,
  // Urbanist_700Bold as urbanistBold,
  Urbanist_100Thin as urbanistThin,
  Urbanist_200ExtraLight as urbanistExtraLight,
  Urbanist_300Light as urbanistLight,
  Urbanist_400Regular as urbanistRegular,
  Urbanist_500Medium as urbanistMedium,
  Urbanist_600SemiBold as urbanistSemiBold,
  Urbanist_700Bold as urbanistBold,
  Urbanist_800ExtraBold as urbanistExtraBold,
  Urbanist_900Black as urbanistBlack,
  Urbanist_100Thin_Italic as urbanistThinItalic,
  Urbanist_200ExtraLight_Italic as urbanistExtraLightItalic,
  Urbanist_300Light_Italic as urbanistLightItalic,
  Urbanist_400Regular_Italic as urbanistRegularItalic,
  Urbanist_500Medium_Italic as urbanistMedium_Italic,
  Urbanist_600SemiBold_Italic as urbanistSemiBoldItalic,
  Urbanist_700Bold_Italic as urbanistBoldItalic,
  Urbanist_800ExtraBold_Italic as urbanistExtraBoldItalic,
  Urbanist_900Black_Italic as urbanistBlackItalic,
} from "@expo-google-fonts/urbanist"
// import {
//   Urbanist_300Light as urbanistLight,
//   Urbanist_400Regular as urbanistRegular,
//   Urbanist_500Medium as urbanistMedium,
//   Urbanist_600SemiBold as urbanistSemiBold,
//   Urbanist_700Bold as urbanistBold,
// } from "@expo-google-fonts/urbanist"

export const customFontsToLoad = {
  urbanistThin,
  urbanistExtraLight,
  urbanistLight,
  urbanistRegular,
  urbanistMedium,
  urbanistSemiBold,
  urbanistBold,
  urbanistExtraBold,
  urbanistBlack,
  urbanistThinItalic,
  urbanistExtraLightItalic,
  urbanistLightItalic,
  urbanistRegularItalic,
  urbanistMedium_Italic,
  urbanistSemiBoldItalic,
  urbanistBoldItalic,
  urbanistExtraBoldItalic,
  urbanistBlackItalic,
}

const fonts = {
  urbanist: {
    // Cross-platform Google font.
    light: "urbanistLight",
    normal: "urbanistRegular",
    medium: "urbanistMedium",
    semiBold: "urbanistSemiBold",
    bold: "urbanistBold",
  },
}

export const typography = {
  /**
   * The fonts are available to use, but prefer using the semantic name.
   */
  fonts,
  /**
   * The primary font. Used in most places.
   */
  primary: fonts.urbanist,
  /**
   * An alternate font used for perhaps titles and stuff.
   */
  secondary: Platform.select({ ios: fonts.urbanist, android: fonts.urbanist }),
  /**
   * Lets get fancy with a monospace font!
   */
  code: Platform.select({ ios: fonts.urbanist, android: fonts.urbanist }),
}

export const fontConfig = {
  Urbanist: {
    100: {
      // normal: "Urbanist_100Thin",
      // italic: "Urbanist_100Thin_Italic",
      normal: "urbanistThin",
      italic: "urbanistThinItalic",
    },
    200: {
      // normal: "Urbanist_200ExtraLight",
      // italic: "Urbanist_200ExtraLight_Italic",
      normal: "urbanistLight",
      italic: "urbanistLightItalic",
    },
    300: {
      // normal: "Urbanist_300Light",
      // italic: "Urbanist_300Light_Italic",
      normal: "urbanistLight",
      italic: "urbanistLightItalic",
    },
    400: {
      // normal: "Urbanist_400Regular",
      // italic: "Urbanist_400Regular_Italic",
      normal: "urbanistRegular",
      italic: "urbanistRegularItalic",
    },
    500: {
      // normal: "Urbanist_500Medium",
      // italic: "Urbanist_500Medium_Italic",
      normal: "urbanistMedium",
      italic: "urbanistMediumItalic",
    },
    600: {
      // normal: "Urbanist_600SemiBold",
      // italic: "Urbanist_600SemiBold_Italic",
      normal: "urbanistSemiBold",
      italic: "urbanistSemiBoldItalic",
    },
    700: {
      // normal: "Urbanist_700Bold",
      // italic: "Urbanist_700Bold_Italic",
      normal: "urbanistBold",
      italic: "urbanistBoldItalic",
    },
    800: {
      // normal: "Urbanist_800ExtraBold",
      // italic: "Urbanist_800ExtraBold_Italic",
      normal: "urbanistExtraBold",
      italic: "urbanistExtraBoldItalic",
    },
    900: {
      // normal: "Urbanist_900Black",
      // italic: "Urbanist_900Black_Italic",
      normal: "urbanistBlack",
      italic: "urbanistBlackItalic",
    },

    // Add more variants
    //   700: {
    //     normal: 'Roboto-Bold',
    //   },
    //   800: {
    //     normal: 'Roboto-Bold',
    //     italic: 'Roboto-BoldItalic',
    //   },
    //   900: {
    //     normal: 'Roboto-Bold',
    //     italic: 'Roboto-BoldItalic',
    //   },
  },
}

  // const [areFontsLoaded] = useFonts({
  //   Urbanist_100Thin,
  //   Urbanist_200ExtraLight,
  //   Urbanist_300Light,
  //   Urbanist_400Regular,
  //   Urbanist_500Medium,
  //   Urbanist_600SemiBold,
  //   Urbanist_700Bold,
  //   Urbanist_800ExtraBold,
  //   Urbanist_900Black,
  //   Urbanist_100Thin_Italic,
  //   Urbanist_200ExtraLight_Italic,
  //   Urbanist_300Light_Italic,
  //   Urbanist_400Regular_Italic,
  //   Urbanist_500Medium_Italic,
  //   Urbanist_600SemiBold_Italic,
  //   Urbanist_700Bold_Italic,
  //   Urbanist_800ExtraBold_Italic,
  //   Urbanist_900Black_Italic,
  // });
