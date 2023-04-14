import React from "react"
import { StackProps } from "@tamagui/web";
import { Stack } from "tamagui";
import { View } from "react-native";

export interface SpaceProps extends StackProps { }

export const XSpace = (props: SpaceProps) => (
  <Stack spaceDirection="horizontal" {...props}> <View /></Stack >
)

export const YSpace = (props: SpaceProps) => (
  <Stack spaceDirection="vertical" {...props}><View /><View /></Stack>
)

