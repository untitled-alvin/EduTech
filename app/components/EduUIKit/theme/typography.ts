// TODO: write documentation about fonts and typography along with guides on how to add custom fonts in own
// markdown file and add links from here
import { GenericFont, createFont, isWeb } from '@tamagui/core'
import { Platform } from "react-native"
import {
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
    // 100: { normal: "Urbanist_100Thin", italic: "Urbanist_100Thin_Italic" },
    100: { normal: "urbanistThin", italic: "urbanistThinItalic" },

    // 200: { normal: "Urbanist_200ExtraLight", italic: "Urbanist_200ExtraLight_Italic" },
    200: { normal: "urbanistLight", italic: "urbanistLightItalic" },

    // 300: { normal: "Urbanist_300Light", italic: "Urbanist_300Light_Italic" },
    300: { normal: "urbanistLight", italic: "urbanistLightItalic" },

    // 400: { normal: "Urbanist_400Regular", italic: "Urbanist_400Regular_Italic" },
    400: { normal: "urbanistRegular", italic: "urbanistRegularItalic" },

    // 500: { normal: "Urbanist_500Medium", italic: "Urbanist_500Medium_Italic" },
    500: { normal: "urbanistMedium", italic: "urbanistMediumItalic" },

    // 600: { normal: "Urbanist_600SemiBold", italic: "Urbanist_600SemiBold_Italic" },
    600: { normal: "urbanistSemiBold", italic: "urbanistSemiBoldItalic" },

    // 700: { normal: "Urbanist_700Bold", italic: "Urbanist_700Bold_Italic" },
    700: { normal: "urbanistBold", italic: "urbanistBoldItalic" },

    // 800: { normal: "Urbanist_800ExtraBold", italic: "Urbanist_800ExtraBold_Italic" },
    800: { normal: "urbanistExtraBold", italic: "urbanistExtraBoldItalic" },

    // 900: { normal: "Urbanist_900Black", italic: "Urbanist_900Black_Italic" },
    900: { normal: "urbanistBlack", italic: "urbanistBlackItalic" },
  },
}

export const createUrbanistFont = <A extends GenericFont<keyof typeof size>>(
  font: Partial<A> = {},
): A => {
  return createFont({
    family: isWeb ? 'Fira Code, Monaco, Consolas, Ubuntu Mono, monospace' : 'Urbanist',

    size,

    lineHeight: Object.fromEntries(
      Object.entries(size).map(([k, v]) => [k, v * 1.3]),
    ) as typeof size,

    weight: {
      1: '100',
      2: '200',
      3: '300',
      4: '400',
      5: '500',
      6: '600',
      7: '700',
      8: '800',
      9: '900',
      regular: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
    },

    letterSpacing: {
      // 4: -0.25,
      4: 0.2,
    },

    face: {
      100: { normal: "urbanistThin", italic: "urbanistThinItalic" },
      200: { normal: "urbanistLight", italic: "urbanistLightItalic" },
      300: { normal: "urbanistLight", italic: "urbanistLightItalic" },
      400: { normal: "urbanistRegular", italic: "urbanistRegularItalic" },
      500: { normal: "urbanistMedium", italic: "urbanistMediumItalic" },
      600: { normal: "urbanistSemiBold", italic: "urbanistSemiBoldItalic" },
      700: { normal: "urbanistBold", italic: "urbanistBoldItalic" },
      800: { normal: "urbanistExtraBold", italic: "urbanistExtraBoldItalic" },
      900: { normal: "urbanistBlack", italic: "urbanistBlackItalic" },

      // regular: '400',
      // medium: '500',
      // semibold: '600',
      // bold: '700',
      regular: { normal: "urbanistRegular", italic: "urbanistRegularItalic" },
      medium: { normal: "urbanistMedium", italic: "urbanistMediumItalic" },
      semibold: { normal: "urbanistSemiBold", italic: "urbanistSemiBoldItalic" },
      bold: { normal: "urbanistBold", italic: "urbanistBoldItalic" },
    },

    ...(font as any),
  })
}

const size = {
  1: 10,
  2: 12,
  3: 14,
  true: 14,
  4: 16,
  5: 18,
  6: 20,
  7: 24,
  8: 30,
  9: 36,
  10: 48,
  11: 60,
  12: 72,
  13: 96,
  14: 128,

  // 
  "2xs": 10,
  "xs": 12,
  "sm": 14,
  "md": 16,
  "lg": 18,
  "xl": 20,
  "2xl": 24,
  "3xl": 30,
  "4xl": 36,
  "5xl": 48,
  "6xl": 60,
  "7xl": 72,
  "8xl": 96,
  "9xl": 128,
} as const

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
