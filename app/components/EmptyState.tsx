import React from "react"
import { Image, ImageProps, ImageStyle, StyleProp, TextStyle, View, ViewStyle } from "react-native"
import { translate } from "../i18n"
import { spacing } from "./ui-kit/theme"
import { Button, ButtonProps } from "./ui-kit/button"
import { Body, BodyProps, Heading, HeadingProps } from "./ui-kit/typography"

const sadFace = require("../../assets/images/sad-face.png")

interface EmptyStateProps {
  /**
   * An optional prop that specifies the text/image set to use for the empty state.
   */
  preset?: keyof typeof EmptyStatePresets
  /**
   * Style override for the container.
   */
  style?: StyleProp<ViewStyle>
  /**
   * An Image source to be displayed above the heading.
   */
  imageSource?: ImageProps["source"]
  /**
   * Style overrides for image.
   */
  imageStyle?: StyleProp<ImageStyle>
  /**
   * Pass any additional props directly to the Image component.
   */
  ImageProps?: Omit<ImageProps, "source">
  /**
   * The heading text to display if not using `headingTx`.
   */
  heading?: HeadingProps["text"]
  /**
   * Heading text which is looked up via i18n.
   */
  headingTx?: HeadingProps["tx"]
  /**
   * Optional heading options to pass to i18n. Useful for interpolation
   * as well as explicitly setting locale or translation fallbacks.
   */
  headingTxOptions?: HeadingProps["txOptions"]
  /**
   * Style overrides for heading text.
   */
  headingStyle?: StyleProp<TextStyle>
  /**
   * Pass any additional props directly to the heading Text component.
   */
  HeadingTextProps?: HeadingProps
  /**
   * The content text to display if not using `contentTx`.
   */
  content?: BodyProps["text"]
  /**
   * Content text which is looked up via i18n.
   */
  contentTx?: BodyProps["tx"]
  /**
   * Optional content options to pass to i18n. Useful for interpolation
   * as well as explicitly setting locale or translation fallbacks.
   */
  contentTxOptions?: BodyProps["txOptions"]
  /**
   * Style overrides for content text.
   */
  contentStyle?: StyleProp<TextStyle>
  /**
   * Pass any additional props directly to the content Text component.
   */
  ContentTextProps?: BodyProps
  /**
   * The button text to display if not using `buttonTx`.
   */
  button?: BodyProps["text"]
  /**
   * Button text which is looked up via i18n.
   */
  buttonTx?: BodyProps["tx"]
  /**
   * Optional button options to pass to i18n. Useful for interpolation
   * as well as explicitly setting locale or translation fallbacks.
   */
  buttonTxOptions?: BodyProps["txOptions"]
  /**
   * Style overrides for button.
   */
  buttonStyle?: BodyProps["style"]
  /**
   * Called when the button is pressed.
   */
  buttonOnPress?: BodyProps["onPress"]
  /**
   * Pass any additional props directly to the Button component.
   */
  ButtonProps?: ButtonProps
  /**
   * Pass any additional props directly to the Button component.
   */
  isRTL?: boolean
}

const EmptyStatePresets = {
  generic: {
    imageSource: sadFace,
    heading: translate("emptyStateComponent.generic.heading"),
    content: translate("emptyStateComponent.generic.content"),
    button: translate("emptyStateComponent.generic.button"),
  },
  normal: {
    imageSource: sadFace,
    heading: translate("emptyStateComponent.normal.heading"),
    content: translate("emptyStateComponent.normal.content"),
  },
} as const

/**
 * A component to use when there is no data to display. It can be utilized to direct the user what to do next.
 *
 * - [Documentation and Examples](https://github.com/infinitered/ignite/blob/master/docs/Components-EmptyState.md)
 */
export function EmptyState(props: EmptyStateProps) {
  const preset = EmptyStatePresets[props.preset] ? EmptyStatePresets[props.preset] : EmptyStatePresets["generic"]
  // const preset = EmptyStatePresets[props.preset] ? EmptyStatePresets[props.preset] : undefined

  const {
    button = preset?.button,
    buttonTx,
    buttonOnPress,
    buttonTxOptions,
    content = preset?.content,
    contentTx,
    contentTxOptions,
    heading = preset?.heading,
    headingTx,
    headingTxOptions,
    imageSource = preset?.imageSource,
    style: $containerStyleOverride,
    buttonStyle: $buttonStyleOverride,
    contentStyle: $contentStyleOverride,
    headingStyle: $headingStyleOverride,
    imageStyle: $imageStyleOverride,
    ButtonProps,
    ContentTextProps,
    HeadingTextProps,
    ImageProps,
    isRTL = false,
  } = props

  const isImagePresent = !!imageSource
  const isHeadingPresent = !!(heading || headingTx)
  const isContentPresent = !!(content || contentTx)
  const isButtonPresent = !!(button || buttonTx)

  const $containerStyles = [$containerStyleOverride]
  const $imageStyles = [
    $image,
    (isHeadingPresent || isContentPresent || isButtonPresent) && { marginBottom: spacing.micro },
    $imageStyleOverride,
    ImageProps?.style,
  ]
  const $headingStyles = [
    $heading,
    isImagePresent && { marginTop: spacing.micro },
    (isContentPresent || isButtonPresent) && { marginBottom: spacing.micro },
    $headingStyleOverride,
    HeadingTextProps?.style,
  ]
  const $contentStyles = [
    $content,
    (isImagePresent || isHeadingPresent) && { marginTop: spacing.micro },
    isButtonPresent && { marginBottom: spacing.micro },
    $contentStyleOverride,
    ContentTextProps?.style,
  ]
  const $buttonStyles = [
    { transform: [{ scaleX: isRTL ? -1 : 1 }] },
    (isImagePresent || isHeadingPresent || isContentPresent) && { marginTop: spacing.extraLarge },
    $buttonStyleOverride,
    ButtonProps?.style,
  ]

  return (
    <View style={$containerStyles}>
      {isImagePresent && (
        <Image source={imageSource} resizeMode="contain" {...ImageProps} style={$imageStyles} />
      )}

      {isHeadingPresent && (
        <Heading
          preset="h4"
          text={heading}
          tx={headingTx}
          marginHorizontal="$large"
          txOptions={headingTxOptions}
          {...HeadingTextProps}
          style={$headingStyles}
        />
      )}

      {isContentPresent && (
        <Body
          text={content}
          tx={contentTx}
          txOptions={contentTxOptions}
          weight="regular"
          marginTop="$3"
          marginHorizontal="$large"
          paddingHorizontal="$large"
          {...ContentTextProps}
          style={$contentStyles}
        />
      )}

      {isButtonPresent && (
        <Button
          onPress={buttonOnPress}
          text={button}
          tx={buttonTx}
          marginHorizontal="$large"
          txOptions={buttonTxOptions}
          {...ButtonProps}
          style={$buttonStyles}
        />
      )}
    </View>
  )
}

const $image: ImageStyle = { alignSelf: "center", width: "75%", marginTop: 24 }
const $heading: TextStyle = { textAlign: "center" }
const $content: TextStyle = { textAlign: "center" }
