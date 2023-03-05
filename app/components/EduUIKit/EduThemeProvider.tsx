import React from "react"
import { extendTheme, NativeBaseProvider, NativeBaseProviderProps } from 'native-base';
import { colors, fontConfig } from "./theme";

export interface EduThemeProviderProps extends NativeBaseProviderProps { }

export function EduThemeProvider(props: EduThemeProviderProps) {
  const theme = extendTheme({
    fontConfig: fontConfig,

    // Make sure values below matches any of the keys in `fontConfig`
    fonts: {
      heading: "Urbanist",
      body: "Urbanist",
      mono: "Urbanist",
    },

    components: {
      // Text: {
      //   // color: 'white',
      //   color: 'primary.500',
      // },
      // Button: {
      //   baseStyle: {
      //     // borderRadius: '100',
      //     // rounded: '100',
      //     // minHeight: '12',
      //     height: '12',
      //   },
      // },
    },
    colors: {
      // Add new color
      primary: {
        50: colors.palette.primary50,
        // Start
        100: colors.palette.primary100,
        200: colors.palette.primary200,
        300: colors.palette.primary300,
        400: colors.palette.primary400,
        500: colors.palette.primary500,
        // End
        600: colors.palette.primary600,
        700: colors.palette.primary700,
        800: colors.palette.primary800,
        900: colors.palette.primary900,
      },

      greyScale: {
        50: colors.palette.greyScale50,
        100: colors.palette.greyScale100,
        200: colors.palette.greyScale200,
        300: colors.palette.greyScale300,
        400: colors.palette.greyScale400,
        500: colors.palette.greyScale500,
        600: colors.palette.greyScale600,
        700: colors.palette.greyScale700,
        800: colors.palette.greyScale800,
        900: colors.palette.greyScale900,
      },
      backGround: "white"
    },

    // config: {
    //   // Changing initialColorMode to 'dark'
    //   // initialColorMode: 'dark',
    // },
  });

  return <NativeBaseProvider theme={theme} {...props} />
}

