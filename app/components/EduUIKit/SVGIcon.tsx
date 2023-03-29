import { ColorTokens, SizeTokens, ThemeTokens, ThemeValueFallback } from '@tamagui/core';
import React, { memo, useContext } from 'react';
import { ColorValue, OpaqueColorValue } from 'react-native';
import Svg, { G, SvgProps } from 'react-native-svg';
import { getTokens, getVariable, getVariableValue, styled, useTheme, YStack } from 'tamagui';

export type IconSVGProps = Omit<
  SvgProps, 'opacity' | 'stroke' | 'height' | 'width' | 'transform' | 'color' | 'stroke'
> & {
  /**
   * The size of the icon.
   */
  size?: number | SizeTokens
  // color?: ColorValue | ColorTokens | ThemeTokens | ThemeValueFallback | OpaqueColorValue | (string & {})
  // color?: (ColorTokens | ThemeTokens | OpaqueColorValue | (string & {})) | null
  // color?: ColorValue | ColorTokens | ThemeTokens | ThemeValueFallback | OpaqueColorValue | (string & {})
  color?: ThemeValueFallback | ColorTokens | OpaqueColorValue | ColorValue | null

  style?: any

  // name?: IconNameType;
  // type?: IconType;
  /**
   * Use <a href='https://github.com/expo/vector-icons'>@expo/vector-icons</a>
   */
  as?: any;
  /**
 * The color of the icon.
 */
  // color?: string;
  stroke?: ColorTokens | string
  /**
   *
   */
  children?: JSX.Element[] | JSX.Element;
  /**
   *
   */
  // strokeWidth?: string;
}

export const IconSVG = ({ children, color = "$color", ...propsIn }: IconSVGProps, ref: any) => {
  const theme = useTheme()
  const tokens = getTokens()

  const hexColor = typeof color === 'string' ?
    color in theme ? getVariableValue(theme[color]) :
      getVariableValue(tokens.color[color] || color)
    : color

  const size =
    typeof propsIn.size === 'string'
      ? getVariableValue(tokens.size[propsIn.size] || propsIn.size)
      : propsIn.size ?? 24

  if (propsIn.as) {
    return React.cloneElement(propsIn.as, {
      ...propsIn.as.props,
      color: hexColor,
      width: size, height: size,
    })
  }
  if (React.Children.count(children) > 0) {
    return <Svg width={size} height={size} color={hexColor} viewBox={`0 0 ${size} ${size}`}
      style={{
        alignItems: "center",
        alignContent: "center",
        alignSelf: "center",
      }}
      {...propsIn}
    >
      {React.Children.map(
        children,
        (child, i) => React.cloneElement(child, {
          ...child.props,
          color: hexColor,
          width: size, height: size,
        }))
      }
    </Svg>
  }

  return <YStack />
}
