import { config } from '@tamagui/config'
import { createTamagui } from "@tamagui/core"
import { shorthands } from "@tamagui/shorthands"
// import { themes } from "@tamagui/themes"
import { createUrbanistFont, tokens } from "./app/components/EduUIKit/theme";
import { themes } from './app/components/EduUIKit/theme/theme';

// these keys can be different, but again we highly recommend consistency
const urbanistFont = createUrbanistFont()

const appConfig = createTamagui({
    ...config,
    themes,
    tokens,
    shorthands,
    fonts: {
        heading: urbanistFont,
        body: urbanistFont,
        urbanist: urbanistFont
    },
    // defaultProps: {
    //     H1: {
    //         fontWeight: "900"
    //     },
    //     H6: {
    //         fontWeight: "900"
    //     },
    //     // Paragraph: {
    //     //     variants: {
    //     //         pin: {
    //     //             true: {
    //     //                 fontWeight: "900"
    //     //             },
    //     //         }
    //     //     }
    //     // },
    //     Button: {
    //         textProps: {
    //             fontWeight: "900"
    //         },
    //         borderRadius: 0,
    //         size: 0,
    //         alignSelf: "center",
    //         backgroundColor: "$primary500",
    //         alignItems: "center",
    //         // size: tokens.size["30"],
    //     },
    // },
})

export type AppConfig = typeof appConfig

declare module "@tamagui/core" {
    interface TamaguiCustomConfig extends AppConfig { }
}

export default appConfig

// themes: {
//     ...themes,
//     ...{
//         primary: {
//             background: '#000',
//             color
//         },
//     }
// },