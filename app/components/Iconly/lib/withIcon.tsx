import React, { memo, useContext } from 'react';
import Svg, { G, SvgProps } from 'react-native-svg';
import { getSize, getThemeProp, getStroke, getOpacity } from './utils';
import { IconlyContext, Theme } from './context';
import { getTokens, getVariable, getVariableValue, styled, useTheme, YStack } from 'tamagui';

export interface Props extends SvgProps {
  label?: string;
  filled?: boolean;
  primaryColor?: string;
  secondaryColor?: string;
  size?: number | 'xxs' | 'xs' | 'small' | 'medium' | 'large' | 'xl';
  set?: 'bold' | 'bulk' | 'light' | 'broken' | 'two-tone' | 'curved';
  stroke?: 'light' | 'regular' | 'bold';
}

function withIcon(Component: React.ElementType): React.MemoExoticComponent<(props: Props) => JSX.Element> {
  const IconWrapper = ({ size, label, primaryColor, secondaryColor, filled, set, stroke, ...restProps }: Props) => {
    const theme = useContext(IconlyContext);
    const iconSize = getSize(size) || getSize(getThemeProp('size', theme) as Theme['size']) || '24px';

    const iconPrimaryColor = primaryColor || getThemeProp('primaryColor', theme) || 'currentColor';

    const iconSecondaryColor =
      secondaryColor || getThemeProp('secondaryColor', theme) || iconPrimaryColor || 'currentColor';

    return (
      <Svg width={iconSize} height={iconSize} viewBox="0 0 24 24" aria-label={label || undefined} {...restProps}>
        <Component
          color={iconPrimaryColor}
          opacity={getOpacity(primaryColor, secondaryColor)}
          secondaryColor={iconSecondaryColor}
          set={filled ? 'bold' : set || getThemeProp('set', theme) || 'light'}
          strokeWidth={
            stroke ? getStroke(stroke) : getStroke(getThemeProp('stroke', theme) as Theme['stroke']) || '1.5px'
          }
        />
      </Svg>
    );
  };
  const MemoIcon = memo(IconWrapper);
  return MemoIcon;
}

export default withIcon;

// export function withIcon<A extends React.FC>(Component: A) {
//   const wrapped = (props: any) => {
//     // const props = useMediaPropsActive(propsIn)
//     const theme = useTheme()
//     // const color = getVariable(
//     //   (props.color in theme ? theme[props.color] : undefined) ||
//     //   props.color ||
//     //   (!props.disableTheme ? theme.color : null) ||
//     //   '#000'
//     // )

//     const color = typeof props.size === 'string'
//       ? getVariableValue(getTokens().color[props.color] || props.color)
//       : props.color

//     const size =
//       typeof props.size === 'string'
//         ? getVariableValue(getTokens().size[props.size] || props.size)
//         : props.size

//     return (
//       <Svg width={size} height={size} viewBox="0 0 24 24" aria-label={props.label || undefined} {...props}>
//         <Component
//           {...props}
//           color={color}
//           // color={iconPrimaryColor}
//           // opacity={getOpacity(primaryColor, secondaryColor)}
//           secondaryColor={color}
//           // set={filled ? 'bold' : set || getThemeProp('set', theme) || 'light'}
//           strokeWidth={1}

//         // strokeWidth={
//         //   stroke ? getStroke(stroke) : getStroke(getThemeProp('stroke', theme) as Theme['stroke']) || '1.5px'
//         // }
//         />
//       </Svg>
//     );
//   };

//   // return <Component {...props} color={color}
//   //   size={size}
//   //   secondaryColor={color}
//   //   strokeWidth={2}
//   // />


//   //       < Component
//   //   color = { iconPrimaryColor }
//   //   opacity = { getOpacity(primaryColor, secondaryColor) }
//   //   secondaryColor = { iconSecondaryColor }
//   //   set = { filled? 'bold': set || getThemeProp('set', theme) || 'light' }
//   //   strokeWidth = {
//   //     stroke? getStroke(stroke): getStroke(getThemeProp('stroke', theme) as Theme['stroke']) || '1.5px'
//   // }
//   // />

//   // @ts-ignore
//   // return <Component {...props} color={color} size={size} />
//   // }
//   const MemoIcon = memo(wrapped);
//   return MemoIcon;

//   // return wrapped as unknown as A
// }

// export default withIcon;
