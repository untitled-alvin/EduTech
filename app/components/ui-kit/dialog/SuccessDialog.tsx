import React from "react"
import { AssetsImage } from "../../assets-image"
import { Dialog, DialogProps, YStack } from "tamagui"
import { translate } from "../../../i18n"
import { Body, Heading } from "../typography"

export function SuccessDialog(props: DialogProps) {
  return (
    <Dialog modal {...props} >
      <Dialog.Portal>
        <Dialog.Overlay
          key="overlay"
          animation="quick"
          o={0.7}
          enterStyle={{ o: 0 }}
          exitStyle={{ o: 0 }}
          backgroundColor="black"
        />
        <Dialog.Content
          key="content"
          ai="center"
          animation={['quick', { opacity: { overshootClamping: true } }]}
          enterStyle={{ x: 0, y: -20, opacity: 0, scale: 0.9 }}
          exitStyle={{ x: 0, y: 10, opacity: 0, scale: 0.95 }}
          borderRadius="$6"
          paddingVertical="$8"
          paddingHorizontal="$8"
          marginHorizontal="$7"
        >

          <YStack h="$6" />
          <YStack alignItems="center"><AssetsImage image="profileSuccess" /></YStack>

          <YStack h="$6" />
          <Heading
            textAlign="center"
            color="$primary500"
            preset="h4"
            text={`${translate("common.congratulations")}!`}
          />

          <YStack h="$4" />
          <Body
            textAlign="center"
            weight="regular"
            size="large"
            text={`${("Your account is ready to use. You will be redirected to the Home page in a few seconds.")}`}
          />

          <YStack h="$8" />
          <AssetsImage image="indicator" />
          <YStack h="$8" />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  )
}
