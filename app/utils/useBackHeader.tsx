import React, { useLayoutEffect } from "react"
import { useNavigation } from "@react-navigation/native"
import { ArrowLeft, Header, HeaderProps, IconButton, IconSVG } from "../components"
import { TextStyle, ViewStyle } from "react-native"
import { goBack } from "../navigators"

/**
 * A hook that can be used to easily set the Header of a react-navigation screen from within the screen"s component.
 *
 * - [Documentation and Examples](https://github.com/infinitered/ignite/blob/master/docs/Utils-useHeader.md)
 */
export function useBackHeader(headerProps: HeaderProps, deps: any[] = []) {
  const navigation = useNavigation()

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: () => <Header LeftActionComponent={
        <IconButton onPress={goBack} >
          <IconSVG size="$6" color="$color" as={<ArrowLeft set="light" />} />
        </IconButton>
      } {...headerProps}
      />
    })
  }, deps)
}

const $style: ViewStyle = { paddingHorizontal: 16 }
const $title: TextStyle = { marginHorizontal: 16, alignItems: "flex-start" }
