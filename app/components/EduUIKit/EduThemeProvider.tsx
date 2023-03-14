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
    colors: { ...colors },

    // config: {
    //   // Changing initialColorMode to 'dark'
    //   // initialColorMode: 'dark',
    // },
  });

  return <NativeBaseProvider theme={theme} {...props} />
}

