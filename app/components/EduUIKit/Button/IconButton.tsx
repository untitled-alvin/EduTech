import { forwardRef } from 'react'
import {
  ButtonFrame,
  GetProps,
  ButtonProps as TamaguiButtonProps,
  styled,
  themeable,
  useButton,
  TamaguiElement,
} from 'tamagui'

const IconButtonFrame = styled(ButtonFrame, {
  size: "$12",
  padding: "$0",
  borderRadius: 1000,
  alignItems: "center",
})

type IconButtonFrameProps = GetProps<typeof IconButtonFrame>

export type IconButtonProps = TamaguiButtonProps & IconButtonFrameProps

export const IconButton = themeable(
  forwardRef<TamaguiElement, IconButtonProps>((propsIn, ref) => {
    const { props } = useButton(propsIn)
    const { size = "$12", ...rest } = props
    return <IconButtonFrame w={size} height={size} {...rest} ref={ref} />
  })
)
