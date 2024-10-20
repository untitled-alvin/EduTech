import {
  styled,
  GetProps,
  Button,
} from 'tamagui'

const IconButtonFrame = styled(Button, {
  // bg: "$transparent",
  w: "$12",
  h: "$12",
  borderRadius: 10000,
  alignItems: "center",
  padding: "$0",
  pressStyle: { opacity: 0.8 }
})

export type IconButtonProps = GetProps<typeof IconButtonFrame>

export const IconButton = IconButtonFrame.styleable<IconButtonProps>((propsIn, ref) => {
  const { size = "$12", ...rest } = propsIn
  return <IconButtonFrame w={size} h={size} ref={ref} {...rest} />
})
