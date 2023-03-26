import React, { FC, forwardRef, memo, useState } from "react"
import { ChevronDown, ChevronUp, EduBody, EduButton, EduHeading, EduInputCustom, IconSVG, Screen, Star, } from "../../components"
import { observer } from "mobx-react-lite"
import { AppStackScreenProps } from "../../navigators/AppNavigator"
import {
  Button, H1, H2, H3, H4, H5, H6, YStack, styled,
  GetProps,
  ButtonProps as TamaguiButtonProps,
  TamaguiElement,
  themeable,
  useButton,
  ScrollView,
  Input,
  XStack,
  getVariable,
  getVariableValue,
  isVariable,
  getTokens,
  Select,
  Adapt,
  Sheet,
  Paragraph,
  SelectProps,
} from "tamagui"
import { LinearGradient } from 'tamagui/linear-gradient'
import { CountrySelect, GenderSelect } from "../auth"

interface DemoScreenProps extends AppStackScreenProps<"Demo"> { }

export const DemoScreen: FC<DemoScreenProps> = observer(function DemoScreen(_props) {

  const a = getVariableValue("$blue10Light")
  // console.log(getVariableValue("$primary500"))
  // console.log(getVariable("$primary500"))
  // console.log(a)
  // console.log(getTokens().color.$blue10Light)
  // console.log(isVariable(getTokens().color.$blue10Light))
  // console.log(getVariable(getTokens().color.$blue10Light))
  // console.log(getVariable("$blue10Light"))
  // console.log(getTokens()["$primary500"]["$primary500"])

  // console.log(getVariableValue("primary500"))
  // console.log(getTokens().color["$primary500"].val)
  // console.log(getVariableValue(getTokens().color["$primary500"]))
  // console.log(getVariableValue(useTheme().color.primary))

  // return <SelectDemo />
  // return <SheetDemo />

  return (
    <Screen safeAreaEdges={["top", "bottom", "left", "right"]} >
      <ScrollView paddingHorizontal="$2">

        <YStack height="$0.5" />
        {/* <SheetDemo /> */}
        <SelectDemo />
        <YStack height="$0.5" />
        <GenderSelect defaultValue="other" error />
        <CountrySelect error />


        <EduHeading text="Heading 1" preset="h1" />
        <EduHeading text="Heading 2" preset="h2" />
        <EduHeading text="Heading 3" preset="h3" />
        <EduHeading text="Heading 4" preset="h4" />
        <EduHeading text="Heading 5" preset="h5" />
        <EduHeading text="Heading 6" preset="h6" />
        <YStack height="$0.5" />
        <EduInputCustom
          error
          placeholder="Email"
          InputLeftElement={<Star set="bold" />}
        />
        <YStack height="$0.5" />
        <EduInputCustom />
        <YStack height="$0.5" />

        <EduBody text="Body xl" sizeT="xl" />
        <EduBody text="Body large" sizeT="large" />
        <EduBody text="Body medium" sizeT="medium" />
        <EduBody text="Body small" sizeT="small" />
        <EduBody text="Body xs" sizeT="xs" />

        <YStack height="$0.5" />
        <EduButton full rounded={false} text="Lorem ipsum" />
        <YStack height="$0.5" />
        <EduButton width={"100%"} >
          Lorem ipsum
        </EduButton>

        <YStack height="$0.5" />

        <EduButton
          preset="secondary"
          width={"100%"}
          tx="common.about"
          rounded={false}
        />

        <YStack height="$0.5" />
        <EduButton
          preset="secondary"
          width={"100%"} >
          Lorem ipsum
        </EduButton>


        <YStack height="$0.5" />

      </ScrollView>
      <YStack paddingHorizontal="$2">

      </YStack>

    </Screen >
  )
})

export function SelectDemo(props: SelectProps) {
  const [val, setVal] = useState('apple')

  return (
    <Select id="food" value={val} onValueChange={setVal} {...props}  >
      <Select.Trigger
        h="$12"
        w="$full"
        bw="$px"
        bg="$greyscale200"
        ai="center"
        borderRadius="$3"
        paddingHorizontal="$4"
        marginVertical="$0"
        iconAfter={ChevronDown}>
        <Select.Value placeholder="Something" />
      </Select.Trigger>

      <Adapt platform="touch">
        <Sheet modal dismissOnSnapToBottom>
          <Sheet.Frame>
            <Sheet.ScrollView>
              <Adapt.Contents />
            </Sheet.ScrollView>
          </Sheet.Frame>
          <Sheet.Overlay />
        </Sheet>
      </Adapt>

      <Select.Content zIndex={200000}>
        <Select.ScrollUpButton ai="center" jc="center" pos="relative" w="100%" h="$3">
          <YStack zi={10}>
            <ChevronUp />
          </YStack>
          <LinearGradient
            start={[0, 0]}
            end={[0, 1]}
            fullscreen
            colors={['$background', '$backgroundTransparent']}
            br="$4"
          />
        </Select.ScrollUpButton>

        <Select.Viewport minWidth={200}>
          <Select.Group space="$0">
            <Select.Label>Fruits</Select.Label>
            {items.map((item, i) => {
              return (
                <Select.Item index={i} key={item.name} value={item.name.toLowerCase()}>
                  <Select.ItemText>{item.name}</Select.ItemText>
                  <Select.ItemIndicator ml="auto">
                    <ChevronDown />
                  </Select.ItemIndicator>
                </Select.Item>
              )
            })}
          </Select.Group>
        </Select.Viewport>

        <Select.ScrollDownButton ai="center" jc="center" pos="relative" w="100%" h="$3">
          <YStack zi={10}>
            <ChevronDown />
          </YStack>
          <LinearGradient
            start={[0, 0]}
            end={[0, 1]}
            fullscreen
            colors={['$backgroundTransparent', '$background']}
            br="$4"
          />
        </Select.ScrollDownButton>
      </Select.Content>
    </Select>
  )
}

const items = [
  { name: 'Apple' },
  { name: 'Pear' },
  { name: 'Blackberry' },
  { name: 'Peach' },
  { name: 'Apricot' },
  { name: 'Melon' },
  { name: 'Honeydew' },
  { name: 'Starfruit' },
  { name: 'Blueberry' },
  { name: 'Rasberry' },
  { name: 'Strawberry' },
  { name: 'Mango' },
  { name: 'Pineapple' },
  { name: 'Lime' },
  { name: 'Lemon' },
  { name: 'Coconut' },
  { name: 'Guava' },
  { name: 'Papaya' },
  { name: 'Orange' },
  { name: 'Grape' },
  { name: 'Jackfruit' },
  { name: 'Durian' },
]
