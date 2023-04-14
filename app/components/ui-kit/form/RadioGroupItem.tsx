import { GetProps, RadioGroup, styled } from "tamagui";

export const RadioGroupItem = styled(RadioGroup.Item, {
  value: undefined,
  name: 'RadioGroupItem',
  bw: 3,
  p: "$0",
  borderColor: "$primary500",
})

export const RadioGroupIndicator = styled(RadioGroup.Indicator, {
  h: "$3", w: "$3",
  bg: "$primary500",
})

export type RadioGroupItemProps = GetProps<typeof RadioGroupItem>


