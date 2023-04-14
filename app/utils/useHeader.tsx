import React, { useLayoutEffect } from "react"
import { useNavigation } from "@react-navigation/native"
import {
  ArrowLeft,
  Header,
  HeaderProps,
  IconButton,
  IconButtonProps,
  IconSVG,
  MoreCircle
} from "../components"
import { TextStyle, ViewStyle } from "react-native"

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

export const ArrowLeftIcon = () => <IconSVG size="$6" as={<ArrowLeft set="light" />} />
export const MoreCircleIcon = () => <IconSVG size="$6" as={<MoreCircle set="light" />} />
export const MoreButton = (props: IconButtonProps) => (
  <IconButton {...props} ><IconSVG size="$6" as={<MoreCircle set="light" />} /></IconButton>
)