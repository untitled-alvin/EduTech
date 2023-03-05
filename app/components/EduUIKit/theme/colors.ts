// TODO: write documentation for colors and palette in own markdown file and add links from here


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

  // Start
  primary50: "#c8d4ff",
  primary100: "#EBEFFE",
  primary200: "#ADBFFC",
  primary300: "#859EFA",
  primary400: "#5C7EF9",
  primary500: "#335EF7",
  // End
  primary600: "#1944e0",
  primary700: "#1d41c4",
  primary800: "#203ea9",
  primary900: "#223a90",

  secondary100: "#FFFBE6",
  secondary200: "#FFED99",
  secondary300: "#FFE566",
  secondary400: "#FFDC33",
  secondary500: "#FFD300",

  greyScale50: "#FAFAFA",
  greyScale100: "#F5F5F5",
  greyScale200: "#EEEEEE",
  greyScale300: "#E0E0E0",
  greyScale400: "#BDBDBD",
  greyScale500: "#9E9E9E",
  greyScale600: "#757575",
  greyScale700: "#616161",
  greyScale800: "#424242",
  greyScale900: "#212121",

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

export const backgroundColor = 'white'

export const colors = {
  /**
   * The palette is available to use, but prefer using the name.
   * This is only included for rare, one-off cases. Try to use
   * semantic names as much as possible.
   */
  palette,
  /**
   * The primary key color is used to derive roles for key components 
   * across the UI, such as the FAB, prominent buttons, active states,
   * as well as the tint of elevated surfaces.
   */
  primary: palette.primary500,
  /**
   * The primary app color.
   */
  onPrimary: palette.neutral100,

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
  tint: palette.primary500,
  /**
   * A subtle color used for lines.
   */
  separator: palette.neutral300,

  /**
   * Alert & Status
   */
  success: "#4ADE80",

  info: "#246BFD",

  warning: "#FACC15",

  error: "#F75555",

  disabled: "#D8D8D8",

  disabledButton: "#4360C9",

  errorBackground: palette.angry100,
}
