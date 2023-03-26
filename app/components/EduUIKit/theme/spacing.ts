/**
  Use these spacings for margins/paddings and other whitespace throughout your app.
 */
export const spacing = {
  none: 0,
  micro: 2,
  tiny: 4,
  extraSmall: 8,
  small: 12,
  medium: 16,
  large: 24,
  extraLarge: 32,
  huge: 48,
  massive: 64,

  0: 0,
  "0.5": 2,
  1: 4,
  "1.5": 6,
  true: 6,
  2: 8,
  "2.5": 10,
  3: 12,
  "3.5": 14,
  4: 16,
  5: 20,
  6: 24,
  7: 28,
  8: 32,
  9: 36,
  10: 40,
  12: 48,
  16: 64,
  20: 80,
  24: 96,
  32: 128,
  40: 160,
  48: 192,
  56: 224,
  64: 256,
  72: 288,
  80: 320,
  96: 384,

  $px: 1,

} as const

export type Spacing = keyof typeof spacing
