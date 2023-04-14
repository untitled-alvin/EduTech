import React, { ErrorInfo } from "react"
import { ScrollView, TextStyle, View, ViewStyle } from "react-native"
import { AssetsIcon, Body, Button, Heading, Screen } from "../../components"
import { color, spacing } from "../../components/ui-kit/theme"

export interface ErrorDetailsProps {
  error: Error
  errorInfo: ErrorInfo
  onReset(): void
}

export function ErrorDetails(props: ErrorDetailsProps) {
  return (
    <Screen
      preset="fixed"
      safeAreaEdges={["top", "bottom"]}
      contentContainerStyle={$contentContainer}
    >
      <View style={$topSection}>
        <AssetsIcon icon="ladybug" size={64} />
        <Heading style={$heading} preset="h4" tx="errorScreen.title" />
        <Body tx="errorScreen.friendlySubtitle" />
      </View>

      <ScrollView style={$errorSection} contentContainerStyle={$errorSectionContentContainer}>

        <Body style={$errorContent} weight="bold" text={`${props.error}`.trim()} />
        <Body
          selectable
          style={$errorBacktrace}
          text={`${props.errorInfo.componentStack}`.trim()}
        />
      </ScrollView>

      <Button
        style={$resetButton}
        onPress={props.onReset}
        tx="errorScreen.reset"
      />
    </Screen>
  )
}

const $contentContainer: ViewStyle = {
  alignItems: "center",
  paddingHorizontal: spacing.large,
  paddingTop: spacing.extraLarge,
  flex: 1,
}

const $topSection: ViewStyle = {
  flex: 1,
  alignItems: "center",
}

const $heading: TextStyle = {
  color: color.statusError,
  marginBottom: spacing.medium,
}

const $errorSection: ViewStyle = {
  flex: 2,
  backgroundColor: "#D7CEC9",
  marginVertical: spacing.medium,
  borderRadius: 6,
}

const $errorSectionContentContainer: ViewStyle = {
  padding: spacing.medium,
}

const $errorContent: TextStyle = { color: color.statusError }

const $errorBacktrace: TextStyle = { marginTop: spacing.medium }

const $resetButton: ViewStyle = {
  backgroundColor: color.statusError,
  paddingHorizontal: spacing.huge,
}
