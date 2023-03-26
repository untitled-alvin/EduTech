import { RadioGroup, styled } from "tamagui";

export const EduRadioGroupIndicator = styled(RadioGroup.Indicator, {
  backgroundColor: "$primary500", h: "$3", w: "$3",
})

export const EduRadioGroupItem = styled(RadioGroup.Item, {
  value: undefined,
  name: 'EduRadioGroupItem',
  borderColor: "$primary500",
  bw: 3,
  p: "$0",
})

