import { createTokens } from "@tamagui/core"
import { tokens as tamaguiTokens } from "@tamagui/themes"
import { dark, greyscale, primary, secondary, status } from "./colors"
import { size } from "./size"
import { spacing } from "./spacing"

const { zIndex } = tamaguiTokens

export const colorTokens = {
  primary,
  secondary,
  greyscale,
  status,
  dark,
  transparent: "rgba(0, 0, 0, 0)",
}

export const color = {
  ...tamaguiTokens.color,
  ...toFlatPropertyMap(colorTokens),
}

export const radius = {
  0: 0,
  1: 1,
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
  9: 9,
  10: 10,
  11: 11,
  12: 12,

  // 0: 0,
  // 1: 4,
  // 2: 8,
  // 3: 12,
  // 4: 16,
  // // true: 16,
  // 5: 20,
  // 6: 24,
  // 7: 28,
  // 8: 32,
  // 9: 34,
  // 10: 40,
  // 11: 44,
  // 12: 48,
}

export const tokens = createTokens({
  ...tamaguiTokens,
  space: spacing,
  zIndex,
  color,
  size,
  radius: Object.fromEntries(
    Object.entries(radius).map(([k, v]) => [k, v * 4]),
  ) as typeof radius,
})


function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function toFlatPropertyMap(obj: object, keySeparator = '.') {
  const flattenRecursive = (obj: object, parentProperty?: string, propertyMap: Record<string, unknown> = {}) => {
    for (const [key, value] of Object.entries(obj)) {
      const property = parentProperty ? `${parentProperty}${capitalizeFirstLetter(key)}` : key;
      // const property = parentProperty ? `${parentProperty}${keySeparator}${key}` : key;
      if (value && typeof value === 'object') {
        flattenRecursive(value, property, propertyMap);
      } else {
        propertyMap[property] = value;
      }
    }
    return propertyMap;
  };
  return flattenRecursive(obj);
}
