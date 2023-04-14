export const primary = {
  primary50: "#C8D4FF",
  primary100: "#EBEFFE",
  primary200: "#ADBFFC",
  primary300: "#859EFA",
  primary400: "#5C7EF9",
  primary500: "#335EF7",
  primary600: "#1944E0",
  primary700: "#1D41C4",
  primary800: "#203EA9",
  primary900: "#223A90",
} as const

export const secondary = {
  secondary100: "#FFFBE6",
  secondary200: "#FFED99",
  secondary300: "#FFE566",
  secondary400: "#FFDC33",
  secondary500: "#FFD300",
} as const

export const greyscale = {
  greyscale50: "#FAFAFA",
  greyscale100: "#F5F5F5",
  greyscale200: "#EEEEEE",
  greyscale300: "#E0E0E0",
  greyscale400: "#BDBDBD",
  greyscale500: "#9E9E9E",
  greyscale600: "#757575",
  greyscale700: "#616161",
  greyscale800: "#424242",
  greyscale900: "#212121",
} as const

export const status = {
  statusSuccess: "#4ADE80",
  statusInfo: "#246BFD",
  statusWarning: "#FACC15",
  statusError: "#F75555",
  statusDisabled: "#D8D8D8",
  statusDisabledButton: "#4360C9",
} as const

export const dark = {
  dark1: "#181A20",
  dark2: "#1F222A",
  dark3: "#35383F",
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