import React, { FC, memo, useEffect, useState } from "react"
import { EduActivityIndicator, Body, Button, Heading, Input, Screen, Star, } from "../../components"
import { observer } from "mobx-react-lite"
import { AppStackScreenProps } from "../../navigators/AppNavigator"
import {
  YStack,
  ScrollView,
  XStack,
} from "tamagui"
import { CountrySelect, GenderSelect } from "../auth"

interface DemoScreenProps extends AppStackScreenProps<"Demo"> { }

export const DemoScreen: FC<DemoScreenProps> = observer(function DemoScreen(_props) {

  // useBackHeader({
  //   titleTx: "editProfileScreen.header"
  // })

  return (
    <Screen safeAreaEdges={["top", "bottom", "left", "right"]} >
      <ScrollView scrollEnabled paddingHorizontal="$2">
        <YStack height="$0.5" />
        <YStack height="$0.5" />
        <GenderSelect defaultValue="other" />
        <CountrySelect error />
        <YStack height="$0.5" />

        <XStack space="$6">
          <EduActivityIndicator size="$12" type="1" />
        </XStack>


        <YStack height="$0.5" />

        <Heading text="Heading 1" preset="h1" />
        <Heading text="Heading 2" preset="h2" />
        <Heading text="Heading 3" preset="h3" />
        <Heading text="Heading 4" preset="h4" />
        <Heading text="Heading 5" preset="h5" />
        <Heading text="Heading 6" preset="h6" />
        <YStack height="$0.5" />
        <Input
          // error
          placeholder="Email"
          InputLeftElement={<Star set="bold" />}
        />
        <YStack height="$0.5" />
        <Input />
        <YStack height="$0.5" />

        <Body text="Body xl" size="xl" />
        <Body text="Body large" size="large" />
        <Body text="Body medium" size="medium" />
        <Body text="Body small" size="small" />
        <Body text="Body xs" size="xs" />

        <YStack height="$0.5" />
        <Button full rounded={false} text="Lorem ipsum" />
        <YStack height="$0.5" />
        <Button width="100%" >
          Lorem ipsum
        </Button>
        <Button preset="secondary" full tx="common.about" rounded={false} />
        <Button preset="social" full tx="common.about" rounded={false} />
        <YStack height="$0.5" />
        <YStack height="$0.5" />
      </ScrollView>
    </Screen >
  )
})