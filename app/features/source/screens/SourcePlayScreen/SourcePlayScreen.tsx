import { observer } from "mobx-react-lite"
import { Box, Center } from "native-base"
import React, { FC, useCallback, useEffect, useMemo, useRef, useState } from "react"
import {
  ViewStyle,
} from "react-native"
import { Screen } from "../../../../components"
import { useStores } from "../../../../models"
import { AppStackScreenProps } from "../../../../navigators"
import { useHeader } from "../../../../utils/useHeader"
import Video, { VideoDecoderProperties, TextTrackType } from 'react-native-video'
import { VideoPlayer } from "./VideoPlayer"

interface SourcePlayScreenProps extends AppStackScreenProps<"SourcePlay"> { }

export const SourcePlayScreen: FC<SourcePlayScreenProps> = observer(_props => {
  useHeader({
    leftIcon: 'arrowLeft',
    leftIconColor: "white",
    backgroundColor: "black",
    onLeftPress: () => navigation.goBack(),
  })

  const { navigation } = _props
  const videoRef = useRef(null)
  const [refreshing, setRefreshing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const onBuffer = useCallback(() => {
    console.log('onBuffer')
  }, [])


  const videoError = useCallback(() => {
    console.log('videoError')

  }, [])

  useEffect(() => {
    // sourceStore.init()
    // load()
  }, [])

  return <VideoPlayer />
  return (
    <Screen preset="fixed" safeAreaEdges={["left", "right"]} >
      <Center flex={1} width={"full"} height={"full"} >
        <VideoPlayer />
      </Center>

    </Screen>
  )
})

