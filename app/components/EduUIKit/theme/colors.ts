export const primary = {
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

export const secondary = {
  100: "#FFFBE6",
  200: "#FFED99",
  300: "#FFE566",
  400: "#FFDC33",
  500: "#FFD300",
} as const

export const greyscale = {
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

export const status = {
  success: "#4ADE80",
  info: "#246BFD",
  warning: "#FACC15",
  error: "#F75555",
  disabled: "#D8D8D8",
  disabledButton: "#4360C9",
} as const

export const dark = {
  1: "#181A20",
  2: "#1F222A",
  3: "#35383F",
} as const

export const colors = {
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
}