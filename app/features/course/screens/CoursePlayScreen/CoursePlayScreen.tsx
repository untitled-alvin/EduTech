import { observer } from "mobx-react-lite"
import React, { FC, useCallback, useEffect, useRef, useState } from "react"
import { Screen } from "../../../../components"
import { AppStackScreenProps } from "../../../../navigators"
import Video, { VideoDecoderProperties, TextTrackType } from 'react-native-video'
import { VideoPlayer } from "./VideoPlayer"
import { YStack } from "tamagui"
import { useBackHeader } from "../../../../utils/useBackHeader"

interface CoursePlayScreenProps extends AppStackScreenProps<"CoursePlay"> { }

export const CoursePlayScreen: FC<CoursePlayScreenProps> = observer(props => {
  const { navigation } = props
  const videoRef = useRef(null)
  const [refreshing, setRefreshing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useBackHeader({ backgroundColor: "black" })

  useEffect(() => { }, [])

  const onBuffer = useCallback(() => {
    console.log('onBuffer')
  }, [])

  const videoError = useCallback(() => {
    console.log('videoError')
  }, [])



  return <VideoPlayer />
  // return (
  //   <Screen preset="fixed" safeAreaEdges={["left", "right"]} >
  //     <YStack flex={1} width={"full"} height={"full"} >
  //       <VideoPlayer />
  //     </YStack>
  //   </Screen>
  // )
})

