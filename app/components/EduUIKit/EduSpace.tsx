import React from "react"
import { StackProps } from "@tamagui/web";
import { Stack } from "tamagui";
import { View } from "react-native";

export interface EduSpaceProps extends StackProps { }

export function EduXSpace(props: EduSpaceProps) {
  return <Stack spaceDirection="horizontal" {...props}><View /></Stack>
}

export function EduYSpace(props: EduSpaceProps) {
  return <Stack spaceDirection="vertical" {...props}><View /><View /></Stack>
}

