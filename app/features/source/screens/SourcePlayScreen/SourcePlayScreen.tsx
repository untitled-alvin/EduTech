import { observer } from "mobx-react-lite"
import React, { FC, useCallback, useEffect, useRef, useState } from "react"
import { Screen } from "../../../../components"
import { AppStackScreenProps } from "../../../../navigators"
import Video, { VideoDecoderProperties, TextTrackType } from 'react-native-video'
import { VideoPlayer } from "./VideoPlayer"
import { YStack } from "tamagui"
import { useBackHeader } from "../../../../utils/useBackHeader"

interface SourcePlayScreenProps extends AppStackScreenProps<"SourcePlay"> { }

export const SourcePlayScreen: FC<SourcePlayScreenProps> = observer(_props => {
  useBackHeader({
    backgroundColor: "black"
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
      <YStack flex={1} width={"full"} height={"full"} >
        <VideoPlayer />
      </YStack>
    </Screen>
  )
})

