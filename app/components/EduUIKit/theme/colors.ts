// TODO: write documentation for colors and palette in own markdown file and add links from here

const primary = {
  // Start
  50: "#C8D4FF",
  100: "#EBEFFE",
  200: "#ADBFFC",
  300: "#859EFA",
  400: "#5C7EF9",
  500: "#335EF7",
  // End
  600: "#1944E0",
  700: "#1D41C4",
  800: "#203EA9",
  900: "#223A90",
} as const

const secondary = {
  100: "#FFFBE6",
  200: "#FFED99",
  300: "#FFE566",
  400: "#FFDC33",
  500: "#FFD300",
} as const

const greyscale = {
  50: "#FAFAFA",
  100: "#F5F5F5",
  200: "#EEEEEE",
  300: "#E0E0E0",
  400: "#BDBDBD",
  500: "#9E9E9E",
  600: "#757575",
  700: "#616161",
  800: "#424242",
  900: "#212121",
} as const

const status = {
  success: "#4ADE80",
  info: "#246BFD",
  warning: "#FACC15",
  error: "#F75555",
  disabled: "#D8D8D8",
  disabledButton: "#4360C9",
} as const

const dark = {
  1: "#181A20",
  2: "#1F222A",
  3: "#35383F",
} as const

const palette = {
  neutral100: "#FFFFFF",
  neutral200: "#F4F2F1",
  neutral300: "#D7CEC9",
  neutral400: "#B6ACA6",
  neutral500: "#978F8A",
  neutral600: "#564E4A",
  neutral700: "#3C3836",
  neutral800: "#191015",
  neutral900: "#000000",

  accent100: "#FFEED4",
  accent200: "#FFE1B2",
  accent300: "#FDD495",
  accent400: "#FBC878",
  accent500: "#FFBB50",

  angry100: "#F2D6CD",
  angry500: "#C03403",

  overlay20: "rgba(25, 16, 21, 0.2)",
  overlay50: "rgba(25, 16, 21, 0.5)",
} as const

// export const backgroundColor = 'white'

export const colors = {
  /**
   * The palette is available to use, but prefer using the name.
   * This is only included for rare, one-off cases. Try to use
   * semantic names as much as possible.
   */
  palette,
  /**
   * The primary app color.
   * The primary key color is used to derive roles for key components 
   * across the UI, such as the FAB, prominent buttons, active states,
   * as well as the tint of elevated surfaces.
   */
  primary,
  /**
   * The secondary app color.
   */
  secondary,

  greyscale,
  /**
   * Alert & Status
   */
  status,

  dark,
  /**
   * A helper for making something see-thru.
   */
  transparent: "rgba(0, 0, 0, 0)",
  /**
   * The default text color in many components.
   */
  text: palette.neutral800,
  /**
   * Secondary text information.
   */
  textDim: palette.neutral600,
  /**
   * The default color of the screen background.
   */
  background: palette.neutral200,
  /**
   * The default border color.
   */
  border: palette.neutral400,
  /**
   * The main tinting color.
   */
  tint: primary[500],
  /**
   * A subtle color used for lines.
   */
  separator: palette.neutral300,

  errorBackground: palette.angry100,
}
