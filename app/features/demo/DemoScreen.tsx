import React, { FC, forwardRef, memo, useState } from "react"
import { EduBody, EduButton, EduHeading, EduInput, IconSVG, Screen, Star, } from "../../components"
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
  Theme,
} from "tamagui"
import { LinearGradient } from 'tamagui/linear-gradient'
import { CountrySelect, GenderSelect } from "../auth"
import { View } from "react-native"

interface DemoScreenProps extends AppStackScreenProps<"Demo"> { }

export const DemoScreen: FC<DemoScreenProps> = observer(function DemoScreen(_props) {

  // useBackHeader({
  //   titleTx: "editProfileScreen.header"
  // })


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
        <YStack height="$0.5" />
        <GenderSelect defaultValue="other" />
        <CountrySelect error />


        <EduHeading text="Heading 1" preset="h1" />
        <EduHeading text="Heading 2" preset="h2" />
        <EduHeading text="Heading 3" preset="h3" />
        <EduHeading text="Heading 4" preset="h4" />
        <EduHeading text="Heading 5" preset="h5" />
        <EduHeading text="Heading 6" preset="h6" />
        <YStack height="$0.5" />
        <EduInput
          // error
          placeholder="Email"
          InputLeftElement={<Star set="bold" />}
        />
        <YStack height="$0.5" />
        <EduInput />
        <YStack height="$0.5" />

        <EduBody text="Body xl" size="xl" />
        <EduBody text="Body large" size="large" />
        <EduBody text="Body medium" size="medium" />
        <EduBody text="Body small" size="small" />
        <EduBody text="Body xs" size="xs" />

        <YStack height="$0.5" />
        <EduButton full rounded={false} text="Lorem ipsum" />
        <YStack height="$0.5" />
        <EduButton width={"100%"} >
          Lorem ipsum
        </EduButton>

        <YStack height="$0.5" />

        <Theme name="tile">
          <EduButton preset="secondary" full tx="common.about" rounded={false} />
        </Theme>


        <YStack height="$0.5" />
        {/* <Theme name="primary500"> */}
        <EduButton width="100%" >
          Lorem ipsum
        </EduButton>
        {/* </Theme> */}



        <YStack height="$0.5" />

      </ScrollView>
      <YStack paddingHorizontal="$2">
      </YStack>
    </Screen >
  )
})
