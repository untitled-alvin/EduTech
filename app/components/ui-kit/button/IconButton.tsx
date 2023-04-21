import { forwardRef } from 'react'
import {
  GetProps,
  ButtonProps as TamaguiButtonProps,
  styled,
  themeable,
  useButton,
  TamaguiElement,
  Button,
} from 'tamagui'

const IconButtonFrame = styled(Button, {
  bg: "$transparent",
  w: "$12",
  h: "$12",
  borderRadius: 10000,
  alignItems: "center",
  padding: "$0",
  pressStyle: { opacity: 0.8 }
})

type IconButtonFrameProps = GetProps<typeof IconButtonFrame>

export type IconButtonProps = TamaguiButtonProps & IconButtonFrameProps

export const IconButton = themeable(
  forwardRef<TamaguiElement, IconButtonProps>((propsIn, ref) => {
    const { props } = useButton(propsIn)
    const { size = "$12", ...rest } = props
    return <IconButtonFrame w={size} h={size} {...rest} ref={ref} />
  })
)
