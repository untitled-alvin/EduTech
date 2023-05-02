import React from "react"
import { Dialog, DialogProps } from "tamagui"
import { ActivityIndicator } from "../../components/ui-kit/indicator/activity-indicator"

export function LoadingDialog(props: DialogProps) {
  return (
    <Dialog modal {...props} >
      <Dialog.Portal>
        <Dialog.Overlay
          key="overlay_loading"
          animation="quick"
          o={0.7}
          enterStyle={{ o: 0 }}
          exitStyle={{ o: 0 }}
          backgroundColor="black"
        />
        <Dialog.Content
          key="content_loading"
          ai="center"
          backgroundColor="transparent"
          animation={['quick', { opacity: { overshootClamping: true } }]}
          enterStyle={{ x: 0, y: -20, opacity: 0, scale: 0.9 }}
          exitStyle={{ x: 0, y: 10, opacity: 0, scale: 0.95 }}
        >
          <ActivityIndicator />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  )
}
