import React, { useLayoutEffect } from "react"
import { useNavigation } from "@react-navigation/native"
import { ArrowLeft, Header, HeaderProps, IconButton, IconSVG, MoreCircle } from "../components"
import { TextStyle, ViewStyle } from "react-native"
import { goBack } from "../navigators"

/**
 * A hook that can be used to easily set the Header of a react-navigation screen from within the screen"s component.
 *
 * - [Documentation and Examples](https://github.com/infinitered/ignite/blob/master/docs/Utils-useHeader.md)
 */
export function useHeader(headerProps: HeaderProps, deps: any[] = []) {
  const navigation = useNavigation()

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: () => <Header style={$style} titleContainerStyle={$title} {...headerProps} />,
    })
  }, deps)
}

const $style: ViewStyle = { paddingHorizontal: 16 }
const $title: TextStyle = { marginHorizontal: 16, alignItems: "flex-start" }

export const ArrowLeftIcon = () => <IconSVG size="$6" color="$greyscale900" as={<ArrowLeft set="light" />} />
export const MoreCircleIcon = () => <IconSVG size="$6" color="$greyscale900" as={<MoreCircle set="light" />} />

export const BackButton = () => {
  return (
    <IconButton onPress={goBack} size="$8" icon={<ArrowLeftIcon />} />
  )
} 
